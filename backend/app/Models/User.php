<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'bio',
        'avatar_url',
        'banner_url',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    /**
     * Get the videos for the user.
     */
    public function videos(): HasMany
    {
        return $this->hasMany(Video::class);
    }

    /**
     * The videos that the user has liked.
     */
    public function likedVideos(): BelongsToMany
    {
        return $this->belongsToMany(Video::class, 'user_video');
    }

    /**
     * The comments that the user has liked.
     */
    public function likedComments(): BelongsToMany
    {
        return $this->belongsToMany(Comment::class, 'user_comment');
    }

    /**
     * The users that this user is subscribed to.
     */
    public function subscriptions(): BelongsToMany
    {
        return $this->belongsToMany(self::class, 'user_subscriptions', 'subscriber_id', 'subscribed_id');
    }

    /**
     * The users who are subscribed to this user.
     */
    public function subscribers(): BelongsToMany
    {
        return $this->belongsToMany(self::class, 'user_subscriptions', 'subscribed_id', 'subscriber_id');
    }

    /**
     * Determine if this user is subscribed to the specified user.
     */
    public function isSubscribedTo(User $user): bool
    {
        return $this->subscriptions()->where('subscribed_id', $user->id)->exists();
    }
}
