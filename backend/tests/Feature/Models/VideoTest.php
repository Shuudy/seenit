<?php

namespace Tests\Feature\Models;

use App\Models\Comment;
use App\Models\User;
use App\Models\Video;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VideoTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that a video belongs to a user.
     */
    public function test_belongs_to_user(): void
    {
        $user = User::factory()->create();
        $video = Video::factory()->create(['user_id' => $user->id]);

        $this->assertInstanceOf(User::class, $video->user);
        $this->assertEquals($user->id, $video->user->id);
    }

    /**
     * Test that a video has many comments.
     */
    public function test_has_many_comments(): void
    {
        $video = Video::factory()->create();
        Comment::factory()->count(4)->create(['video_id' => $video->id]);

        $this->assertCount(4, $video->comments);
        $this->assertTrue($video->comments->contains($video->comments->first()));
    }

    /**
     * Test that a video can be liked by many users.
     */
    public function test_liked_by_many_users(): void
    {
        $video = Video::factory()->create();
        $users = User::factory()->count(3)->create();

        $video->likedBy()->attach($users->pluck('id')); // Attach users to the video's likedBy relationship

        $this->assertCount(3, $video->likedBy);
        $this->assertTrue($video->likedBy->contains($users->first()));
    }
}
