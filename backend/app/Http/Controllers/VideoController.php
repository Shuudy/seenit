<?php

namespace App\Http\Controllers;

use App\Http\Requests\Comment\StoreCommentRequest;
use App\Http\Requests\Video\UpdateVideoRequest;
use App\Http\Requests\Video\UploadVideoRequest;
use App\Http\Resources\CommentResource;
use App\Http\Resources\ErrorResource;
use App\Http\Resources\SuccessResource;
use App\Http\Resources\VideoResource;
use App\Models\Video;
use getID3;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use RuntimeException;
use Throwable;

class VideoController extends Controller
{
    /**
     * Display a listing of the videos.
     */
    public function index(): SuccessResource
    {
        $videos = Video::with('user')->latest()->get();

        return new SuccessResource([
            'message' => 'Videos retrieved',
            'data' => VideoResource::collection($videos),
        ]);
    }

    /**
     * Display the specified video.
     */
    public function show(Video $video): SuccessResource
    {
        // Eager load the user relationship
        $video->load('user');

        return new SuccessResource([
            'message' => 'Video retrieved',
            'data' => new VideoResource($video),
        ]);
    }

    /**
     * Store a newly uploaded video in storage.
     */
    public function store(UploadVideoRequest $request): SuccessResource|ErrorResource
    {
        $validated = $request->validated();

        $storedPath = null;
        DB::beginTransaction();

        try {
            $file = $request->file('video');

            // Read video duration using getID3 library
            $analyzer = new getID3;
            $analyzer->option_md5_data = false;
            $analyzer->option_md5_data_source = false;
            $info = $analyzer->analyze($file->getRealPath());

            $duration = $info['playtime_seconds'] ?? null;

            if (! is_finite($duration) || $duration <= 0) {
                throw new RuntimeException('Unable to read video duration');
            }

            $storedPath = $file->store('videos', 'public');
            $publicUrl = url(Storage::url($storedPath));

            $video = Video::create([
                'title' => $validated['title'],
                'description' => $validated['description'] ?? null,
                'url' => $publicUrl,
                'duration' => (int) round($duration),
                'user_id' => $request->user()->id,
            ]);

            DB::commit();

            return new SuccessResource([
                'message' => 'Video uploaded successfully',
                'data' => new VideoResource($video),
            ]);
        } catch (Throwable $e) {
            DB::rollBack();

            if ($storedPath && Storage::disk('public')->exists($storedPath)) {
                Storage::disk('public')->delete($storedPath);
            }

            return new ErrorResource('Video upload failed', 500);
        }
    }

    /**
     * Update the specified video.
     */
    public function update(Video $video, UpdateVideoRequest $request): SuccessResource
    {
        // Authorize the update action using the VideoPolicy
        Gate::authorize('update', $video);

        $video->update($request->validated());

        return new SuccessResource([
            'message' => 'Video updated',
            'data' => new VideoResource($video),
        ]);
    }

    /**
     * Remove the specified video.
     */
    public function delete(Video $video): SuccessResource
    {
        // Authorize the delete action using the VideoPolicy
        Gate::authorize('delete', $video);

        $videoPath = $video->url;

        // Handle both stored public URLs and relative storage paths
        if (str_starts_with($videoPath, 'http')) {
            $parsed = parse_url($videoPath, PHP_URL_PATH) ?: '';
            $relative = ltrim($parsed, '/');
            if (str_starts_with($relative, 'storage/')) {
                $relative = substr($relative, 8);
            }
            $videoPath = $relative;
        }

        if ($videoPath && Storage::disk('public')->exists($videoPath)) {
            Storage::disk('public')->delete($videoPath);
        }

        $video->delete();

        return new SuccessResource([
            'message' => 'Video deleted',
        ]);
    }

    /**
     * Get comments for the specified video.
     */
    public function comments(Video $video): SuccessResource
    {
        $user = auth('sanctum')->user();

        $comments = $video->comments()
            ->with('user')
            ->withCount('likedBy')
            ->withExists([
                'likedBy as is_liked_by_current_user' => fn ($q) => $q->where('user_id', $user?->id),
            ])
            ->latest()
            ->get();

        if (! $user) {
            $comments->each(fn ($c) => $c->is_liked_by_current_user = false);
        }

        return new SuccessResource([
            'message' => 'Comments retrieved',
            'data' => CommentResource::collection($comments),
            'meta' => [
                'comments_count' => $video->comments()->count(),
            ],
        ]);
    }

    /**
     * Like or unlike a video.
     */
    public function like(Video $video): SuccessResource
    {
        $user = request()->user();

        $result = $user->likedVideos()->toggle($video->id);
        $liked = ! empty($result['attached']);

        $video->loadCount('likedBy');

        return new SuccessResource([
            'message' => $liked ? 'Video liked' : 'Video unliked',
            'data' => [
                'liked' => $liked,
                'likes_count' => (int) $video->liked_by_count,
            ],
        ]);
    }

    /**
     * Increment the view count of a video.
     */
    public function incrementViews(Video $video): SuccessResource
    {
        $video->increment('count_views');
        $video->refresh();

        return new SuccessResource([
            'message' => 'View count updated',
            'data' => ['count_views' => (int) $video->count_views],
        ]);
    }

    /**
     * Get recommended videos based on the specified video.
     */
    public function recommendations(Video $video): SuccessResource
    {
        $baseQuery = Video::with('user')->where('id', '!=', $video->id);

        $sameAuthor = (clone $baseQuery)
            ->where('user_id', $video->user_id)
            ->latest()
            ->take(6)
            ->get();

        if ($sameAuthor->count() >= 6) {
            $videos = $sameAuthor;
        } else {
            $needed = 6 - $sameAuthor->count();
            $excludeIds = $sameAuthor->pluck('id')->push($video->id)->all();

            $others = $baseQuery
                ->whereNotIn('id', $excludeIds)
                ->latest()
                ->take($needed)
                ->get();

            // preserve order: sameAuthor first, then others
            $videos = $sameAuthor->concat($others);
        }

        return new SuccessResource([
            'message' => 'Recommended videos retrieved',
            'data' => VideoResource::collection($videos),
        ]);
    }

    /**
     * Store a new comment for the specified video.
     */
    public function storeComment(StoreCommentRequest $request, Video $video): SuccessResource
    {
        $user_id = $request->user()->id;

        $comment = $video->comments()->create([
            'content' => $request->validated('content'),
            'user_id' => $user_id,
        ]);
        $comment->load('user');

        return new SuccessResource([
            'message' => 'Comment created',
            'data' => new CommentResource($comment),
        ]);
    }
}
