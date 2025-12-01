<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Video;

class VideoPolicy
{
    /**
     * Determine whether the user can update the video.
     */
    public function update(User $user, Video $video): bool
    {
        return $user->id === (int) $video->user_id;
    }

    /**
     * Determine whether the user can delete the video.
     */
    public function delete(User $user, Video $video): bool
    {
        return $user->id === (int) $video->user_id;
    }
}
