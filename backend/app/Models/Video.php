<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Video extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'url', 'duration', 'views_count', 'user_id'];

    /**
     * Get the user that owns the video.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the comments for the video.
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * The users that liked the video.
     */
    public function likedBy(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_video');
    }

    /**
     * Get the number of likes for the video.
     */
    protected function getLikesCountAttribute(): int
    {
        return $this->likedBy()->count();
    }
}
