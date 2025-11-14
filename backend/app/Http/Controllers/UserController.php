<?php

namespace App\Http\Controllers;

use App\Http\Resources\SuccessResource;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Show the specified user.
     */
    public function show($id)
    {
        $user = User::findOrFail($id);

        return response()->json(new SuccessResource([
            'message' => 'User found successfully.',
            'data' => $user,
        ]));
    }

    /**
     * Get videos of the specified user.
     */
    public function videos($id)
    {
        $user = User::findOrFail($id);
        $videos = $user->videos;

        return response()->json(new SuccessResource([
            'message' => 'User videos retrieved successfully.',
            'data' => $videos,
        ]));
    }

    /**
     * Get liked videos of the specified user.
     */
    public function likedVideos($id) {
        $user = User::findOrFail($id);
        $likedVideos = $user->likedVideos;
    
        return response()->json(new SuccessResource([
            'message' => 'User liked videos retrieved successfully.',
            'data' => $likedVideos,
        ]));
    }

    /**
     * Get liked comments of the specified user.
     */
    public function likedComments($id) {
        $user = User::findOrFail($id);
        $likedComments = $user->likedComments;

        return response()->json(new SuccessResource([
            'message' => 'User liked comments retrieved successfully.',
            'data' => $likedComments,
        ]));
    }
}
