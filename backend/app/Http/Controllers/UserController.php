<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileImagesRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Resources\ErrorResource;
use App\Http\Resources\SuccessResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Show the specified user.
     */
    public function show(User $user): SuccessResource
    {
        // Prevent N+1 problem and include subscribers count
        $user->loadCount(['videos', 'subscribers']);

        return new SuccessResource([
            'message' => 'User found successfully.',
            'data' => new UserResource($user),
        ]);
    }

    /**
     * Subscribe the authenticated user to the given user.
     */
    public function subscribe(User $user, Request $request): SuccessResource|ErrorResource
    {
        $auth = $request->user();

        if ($auth->id === $user->id) {
            return new ErrorResource([
                'message' => 'You cannot subscribe to yourself.',
            ]);
        }

        if ($auth->isSubscribedTo($user)) {
            return new ErrorResource([
                'message' => 'Already subscribed.',
            ]);
        }

        $auth->subscriptions()->attach($user->id);

        // Reload counts
        $user->loadCount('subscribers');

        return new SuccessResource([
            'message' => 'Subscribed successfully.',
            'data' => new UserResource($user),
        ]);
    }

    /**
     * Unsubscribe the authenticated user from the given user.
     */
    public function unsubscribe(User $user, Request $request): SuccessResource|ErrorResource
    {
        $auth = $request->user();

        if ($auth->id === $user->id) {
            return new ErrorResource([
                'message' => 'You cannot unsubscribe from yourself.',
            ]);
        }

        if (! $auth->isSubscribedTo($user)) {
            return new ErrorResource([
                'message' => 'Not subscribed.',
            ]);
        }

        $auth->subscriptions()->detach($user->id);

        // Reload counts
        $user->loadCount('subscribers');

        return new SuccessResource([
            'message' => 'Unsubscribed successfully.',
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
            'username' => $validated['username'] ?? $user->username,
            'email' => $validated['email'] ?? $user->email,
            'bio' => $validated['bio'] ?? $user->bio,
        ]);

        $user->save();

        return new SuccessResource([
            'message' => 'Profile updated successfully.',
            'data' => new UserResource($user),
        ]);
    }

    /**
     * Update the authenticated user's profile images.
     */
    public function updateImages(UpdateProfileImagesRequest $request): SuccessResource
    {
        $user = $request->user();

        // Handle avatar upload
        if ($request->hasFile('avatar')) {
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
            $user->avatar_url = url(Storage::url($avatarPath));
        }

        // Handle banner upload
        if ($request->hasFile('banner')) {
            $bannerPath = $request->file('banner')->store('banners', 'public');
            $user->banner_url = url(Storage::url($bannerPath));
        }

        $user->save();

        return new SuccessResource([
            'message' => 'Profile images updated successfully.',
            'data' => new UserResource($user),
        ]);
    }
}
