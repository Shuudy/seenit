<?php

namespace Tests\Feature\Models;

use App\Models\Comment;
use App\Models\User;
use App\Models\Video;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CommentTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that a comment belongs to a user.
     */
    public function test_belongs_to_user(): void
    {
        $user = User::factory()->create();
        $comment = Comment::factory()->create(['user_id' => $user->id]);

        $this->assertInstanceOf(User::class, $comment->user);
        $this->assertEquals($user->id, $comment->user->id);
    }

    /**
     * Test that a comment belongs to a video.
     */
    public function test_belongs_to_video(): void
    {
        $video = Video::factory()->create();
        $comment = Comment::factory()->create(['video_id' => $video->id]);

        $this->assertInstanceOf(Video::class, $comment->video);
        $this->assertEquals($video->id, $comment->video->id);
    }

    /**
     * Test that a comment can be liked by many users.
     */
    public function test_liked_by_many_users(): void
    {
        $comment = Comment::factory()->create();
        $users = User::factory()->count(2)->create();

        $comment->likedBy()->attach($users->pluck('id')); // Attach users to the comment's likedBy relationship

        $this->assertCount(2, $comment->likedBy);
        $this->assertTrue($comment->likedBy->contains($users->first()));
    }
}
