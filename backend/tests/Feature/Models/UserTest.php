<?php

namespace Tests\Feature\Models;

use App\Models\Comment;
use App\Models\User;
use App\Models\Video;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that a user has many videos.
     */
    public function test_has_many_videos(): void
    {
        $user = User::factory()->create();
        Video::factory()->count(3)->create(['user_id' => $user->id]);

        $this->assertCount(3, $user->videos);
        $this->assertTrue($user->videos->contains($user->videos->first()));
    }

    /**
     * Test that a user can like many videos.
     */
    public function test_belongs_to_many_liked_videos(): void
    {
        $user = User::factory()->create();
        $videos = Video::factory()->count(2)->create();

        $user->likedVideos()->attach($videos->pluck('id'));

        $this->assertCount(2, $user->likedVideos);
        $this->assertTrue($user->likedVideos->contains($user->likedVideos->first()));
    }

    /**
     * Test that a user can like many comments.
     */
    public function test_belongs_to_many_liked_comments(): void
    {
        $user = User::factory()->create();
        $comments = Comment::factory()->count(2)->create();

        $user->likedComments()->attach($comments->pluck('id'));

        $this->assertCount(2, $user->likedComments);
        $this->assertTrue($user->likedComments->contains($user->likedComments->first()));
    }

    /**
     * Test that the liked videos pivot table is consistent with the video's likedBy relationship.
     */
    public function test_liked_videos_pivot_is_consistent_with_video_liked_by(): void
    {
        $user = User::factory()->create();
        $video = Video::factory()->create();

        $user->likedVideos()->attach($video->id);

        $this->assertTrue($user->likedVideos->contains($video));
        $this->assertTrue($video->likedBy->contains($user));
    }

    /**
     * Test that the liked comments pivot table is consistent with the comment's likedBy relationship.
     */
    public function test_liked_comments_pivot_is_consistent_with_comment_liked_by(): void
    {
        $user = User::factory()->create();
        $comment = Comment::factory()->create();

        $user->likedComments()->attach($comment->id);

        $this->assertTrue($user->likedComments->contains($comment));
        $this->assertTrue($comment->likedBy->contains($user));
    }

    /**
     * Test that a user can have many subscriptions.
     */
    public function test_belongs_to_many_subscriptions(): void
    {
        $user = User::factory()->create();
        $subscribedUsers = User::factory()->count(2)->create();

        $user->subscriptions()->attach($subscribedUsers->pluck('id'));

        $this->assertCount(2, $user->subscriptions);
        $this->assertTrue($user->subscriptions->contains($subscribedUsers->first()));
    }

    /**
     * Test that a user can have many subscribers.
     */
    public function test_belongs_to_many_subscribers(): void
    {
        $user = User::factory()->create();
        $subscribers = User::factory()->count(2)->create();

        $user->subscribers()->attach($subscribers->pluck('id'));

        $this->assertCount(2, $user->subscribers);
        $this->assertTrue($user->subscribers->contains($subscribers->first()));
    }

    /**
     * Test the isSubscribedTo helper method.
     */
    public function test_is_subscribed_to_helper(): void
    {
        $user = User::factory()->create();
        $targetUser = User::factory()->create();

        $this->assertFalse($user->isSubscribedTo($targetUser));

        $user->subscriptions()->attach($targetUser->id);

        $this->assertTrue($user->isSubscribedTo($targetUser));
    }
}
