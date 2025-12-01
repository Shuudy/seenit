<?php

namespace App\Http\Controllers;

use App\Http\Requests\Comment\UpdateCommentRequest;
use App\Http\Resources\CommentResource;
use App\Http\Resources\SuccessResource;
use App\Models\Comment;
use Illuminate\Support\Facades\Gate;

class CommentController extends Controller
{
    /**
     * Update the specified comment.
     */
    public function update(Comment $comment, UpdateCommentRequest $request): SuccessResource
    {
        // Authorize the update action using the CommentPolicy
        Gate::authorize('update', $comment);

        $comment->update($request->validated());

        return new SuccessResource([
            'message' => 'Comment updated',
            'data' => new CommentResource($comment),
        ]);
    }

    /**
     * Delete the specified comment.
     */
    public function delete(Comment $comment): SuccessResource
    {
        // Authorize the delete action using the CommentPolicy
        Gate::authorize('delete', $comment);

        $comment->delete();

        return new SuccessResource([
            'message' => 'Comment deleted',
        ]);
    }

    /**
     * Like or unlike the specified comment.
     */
    public function like(Comment $comment): SuccessResource
    {
        $user = request()->user();

        $result = $comment->likedBy()->toggle($user->id);
        $liked = ! empty($result['attached']);

        $comment->loadCount('likedBy');

        return new SuccessResource([
            'message' => $liked ? 'Comment liked' : 'Comment unliked',
            'data' => [
                'liked' => $liked,
                'likes_count' => (int) $comment->liked_by_count,
            ],
        ]);
    }
}
