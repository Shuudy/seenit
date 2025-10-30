<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['content', 'user_id', 'video_id'];

    /**
     * Get the user that owns the comment.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the video that the comment belongs to.
     */
    public function video(): BelongsTo
    {
        return $this->belongsTo(Video::class);
    }

    /**
     * The users that liked the comment.
     */
    public function likedBy(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_comment');
    }

    /**
     * Get the number of likes for the comment.
     */
    protected function getLikesCountAttribute(): int
    {
        return $this->likedBy()->count();
    }
}
