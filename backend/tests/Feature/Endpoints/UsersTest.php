<?php

namespace Tests\Feature\Endpoints;

use App\Models\Comment;
use App\Models\User;
use App\Models\Video;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UsersTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that the show endpoint returns the correct user data.
     */
    public function test_show_returns_user_resource(): void
    {
        $user = User::factory()->create();
        Video::factory()->count(2)->create(['user_id' => $user->id]);

        $response = $this->getJson("/api/users/{$user->id}");

        $response->assertOk()
            ->assertJsonStructure([
                'status',
                'message',
                'data' => ['id', 'username', 'email', 'videos_count', 'avatar_url', 'banner_url'],
            ])
            ->assertJsonPath('message', 'User found successfully.')
            ->assertJsonPath('data.id', $user->id)
            ->assertJsonPath('data.videos_count', 2);
    }

    /**
     * Test that the user's videos endpoint returns a list of their videos.
     */
    public function test_user_videos_returns_list(): void
    {
        $user = User::factory()->create();
        Video::factory()->count(2)->create(); // Videos by other users
        Video::factory()->count(3)->create(['user_id' => $user->id]);

        $response = $this->getJson("/api/users/{$user->id}/videos");

        $response->assertOk()
            ->assertJsonStructure([
                'status',
                'message',
                'data' => [
                    '*' => ['id', 'title', 'description', 'url', 'duration', 'count_views', 'user_id'],
                ],
            ])
            ->assertJsonPath('message', 'User videos retrieved successfully.')
            ->assertJsonCount(3, 'data');

        // Assert that all returned videos belong to the user
        $data = $response->json('data');
        foreach ($data as $item) {
            $this->assertEquals($user->id, $item['user_id']);
        }
    }

    /**
     * Test that the user's videos endpoint returns an empty array when the user has no videos.
     */
    public function test_user_videos_returns_empty_when_no_videos(): void
    {
        $user = User::factory()->create();

        $response = $this->getJson("/api/users/{$user->id}/videos");

        $response->assertOk()
            ->assertJsonStructure([
                'status',
                'message',
                'data',
            ])
            ->assertJsonPath('message', 'User videos retrieved successfully.')
            ->assertJsonCount(0, 'data');
    }

    /**
     * Test that the user's liked videos endpoint returns a list of liked videos.
     */
    public function test_user_liked_videos_returns_list(): void
    {
        $user = User::factory()->create();
        $videos = Video::factory()->count(2)->create();
        Video::factory()->count(2)->create(); // Videos not liked by the user

        $user->likedVideos()->attach($videos->pluck('id'));

        $response = $this->getJson("/api/users/{$user->id}/liked-videos");

        $response->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonStructure([
                'status',
                'message',
                'data' => [
                    '*' => ['id', 'title', 'url', 'duration', 'user_id'],
                ],
            ]);
    }

    /**
     * Test that the user's liked comments endpoint returns a list of liked comments.
     */
    public function test_user_liked_comments_returns_list(): void
    {
        $user = User::factory()->create();
        $commentOwner = User::factory()->create();
        $video = Video::factory()->create(['user_id' => $commentOwner->id]);

        $comments = Comment::factory()->count(2)->create(['video_id' => $video->id, 'user_id' => $commentOwner->id]);

        $user->likedComments()->attach($comments->pluck('id'));

        $response = $this->getJson("/api/users/{$user->id}/liked-comments");

        $response->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonStructure([
                'status',
                'message',
                'data' => [
                    '*' => ['id', 'content', 'user_id', 'video_id'],
                ],
            ]);
    }
}
