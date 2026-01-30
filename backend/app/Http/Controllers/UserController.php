<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use App\Http\Resources\SuccessResource;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Show the specified user.
     */
    public function show(User $user): SuccessResource
    {
        // Prevent N+1 problem
        $user->loadCount('videos');

        return new SuccessResource([
            'message' => 'User found successfully.',
            'data' => new UserResource($user),
        ]);
    }

    /**
     * Get videos of the specified user.
     */
    public function videos(User $user): SuccessResource
    {
        $videos = $user->videos;

        return new SuccessResource([
            'message' => 'User videos retrieved successfully.',
            'data' => $videos,
        ]);
    }

    /**
     * Get liked videos of the specified user.
     */
    public function likedVideos(User $user): SuccessResource
    {
        $likedVideos = $user->likedVideos;

        return new SuccessResource([
            'message' => 'User liked videos retrieved successfully.',
            'data' => $likedVideos,
        ]);
    }

    /**
     * Get liked comments of the specified user.
     */
    public function likedComments(User $user): SuccessResource
    {
        $likedComments = $user->likedComments;

        return new SuccessResource([
            'message' => 'User liked comments retrieved successfully.',
            'data' => $likedComments,
        ]);
    }

    /**
     * Update the authenticated user's profile.
     */
    public function update(UpdateProfileRequest $request): SuccessResource
    {
        $user = $request->user();

        $validated = $request->validated();

        $user->fill([
            'username' => $validated['username'],
            'email' => $validated['email'],
            'bio' => $validated['bio'] ?? null,
        ]);

        $user->save();

        return new SuccessResource([
            'message' => 'Profile updated successfully.',
            'data' => new UserResource($user),
        ]);
    }
}
