<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Comment extends Model
{
    protected $fillable = ['content', 'user_id', 'video_id'];

    /**
     * Get the user that owns the comment.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The users that liked the comment.
     */
    public function likedBy(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_comment')->withTimestamps();
    }

    /**
     * Get the number of likes for the comment.
     */
    protected function getLikesCountAttribute(): int
    {
        return $this->likedBy()->count();
    }
}
