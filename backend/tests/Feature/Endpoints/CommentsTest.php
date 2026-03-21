<?php

namespace Tests\Feature\Endpoints;

use App\Models\Comment;
use App\Models\User;
use App\Models\Video;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CommentsTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that an authenticated user can like a comment.
     */
    public function test_authenticated_user_can_like_comment(): void
    {
        $video = Video::factory()->create();
        $comment = Comment::factory()->create(['video_id' => $video->id]);
        $liker = User::factory()->create();

        $this->assertEquals(0, $comment->likes_count);

        $response = $this->actingAs($liker, 'sanctum')->postJson("/api/comments/{$comment->id}/like");

        $response->assertOk()
            ->assertJsonStructure([
                'status',
                'message',
                'data' => ['liked', 'likes_count'],
            ])
            ->assertJsonPath('message', 'Comment liked')
            ->assertJsonPath('data.liked', true)
            ->assertJsonPath('data.likes_count', 1);

        $this->assertEquals(1, $comment->likes_count);
        $this->assertDatabaseHas('user_comment', ['comment_id' => $comment->id, 'user_id' => $liker->id]);
    }

    /**
     * Test that the comment owner can update their comment.
     */
    public function test_authenticated_owner_can_update_comment(): void
    {
        $comment = Comment::factory()->create(['content' => 'Old content']);
        $owner = $comment->user;

        $payload = ['content' => 'Updated content'];

        $response = $this->actingAs($owner, 'sanctum')->putJson("/api/comments/{$comment->id}", $payload);

        $response->assertOk()
            ->assertJsonPath('data.content', 'Updated content');

        $this->assertDatabaseHas('comments', ['id' => $comment->id, 'content' => 'Updated content']);
    }

    /**
     * Test that validation prevents updating a comment with empty content.
     */
    public function test_cannot_update_comment_with_empty_content(): void
    {
        $comment = Comment::factory()->create();

        $this->actingAs($comment->user, 'sanctum')->putJson("/api/comments/{$comment->id}", ['content' => ''])
            ->assertStatus(422)
            ->assertJsonValidationErrors('content');
    }

    /**
     * Test that the comment owner can delete their comment.
     */
    public function test_authenticated_owner_can_delete_comment(): void
    {
        $comment = Comment::factory()->create();
        $owner = $comment->user;

        $response = $this->actingAs($owner, 'sanctum')->deleteJson("/api/comments/{$comment->id}");

        $response->assertOk();

        $this->assertDatabaseMissing('comments', ['id' => $comment->id]);
    }

    /**
     * Test that a user cannot update another user's comment.
     */
    public function test_user_cannot_update_others_comment(): void
    {
        $owner = User::factory()->create();
        $stranger = User::factory()->create();

        $comment = Comment::factory()->create(['user_id' => $owner->id, 'content' => 'Owner content']);

        $payload = ['content' => 'Hacked content'];

        $response = $this->actingAs($stranger, 'sanctum')->putJson("/api/comments/{$comment->id}", $payload);

        $response->assertForbidden();

        $this->assertDatabaseHas('comments', ['id' => $comment->id, 'content' => 'Owner content']);
    }

    /**
     * Test that a user cannot delete another user's comment.
     */
    public function test_user_cannot_delete_others_comment(): void
    {
        $owner = User::factory()->create();
        $stranger = User::factory()->create();

        $comment = Comment::factory()->create(['user_id' => $owner->id]);

        $response = $this->actingAs($stranger, 'sanctum')->deleteJson("/api/comments/{$comment->id}");

        $response->assertForbidden();

        $this->assertDatabaseHas('comments', ['id' => $comment->id]);
    }
}
