<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Http\Resources\ErrorResource;
use App\Http\Resources\CommentResource;
use App\Http\Resources\SuccessResource;
use App\Http\Requests\Comment\UpdateCommentsRequest;

class CommentController extends Controller
{

    public function update(UpdateCommentsRequest $request, Comment $comment)
    {
        Gate::authorize('update', $comment);

        $comment->update($request->validated());

        return new SuccessResource([
            'message' => 'Comment updated successfully',
            'data' => new CommentResource($comment),
        ]);
    }

    public function destroy(Request $request, Comment $comment)
    {
        Gate::authorize('delete', $comment);

        $comment->delete();

        return new SuccessResource(['message' => 'Comment deleted successfully']);
    }

    public function like(Request $request, Comment $comment)
    {
        $userId = $request->user()->id;

        if ($comment->likedBy()->where('user_id', $userId)->exists()) {
            $comment->likedBy()->detach($userId);
            $message = 'Like removed';
        } else {
            $comment->likedBy()->attach($userId);
            $message = 'Comment liked';
        }

        return new SuccessResource([
            'message' => $message,
            'data' => ['likes_count' => $comment->likes_count],
        ]);
    }
}
