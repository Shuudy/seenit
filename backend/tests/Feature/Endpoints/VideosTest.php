<?php

namespace Tests\Feature\Endpoints;

use App\Models\Comment;
use App\Models\Video;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VideosTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that the index endpoint returns a list of videos with the correct structure.
     */
    public function test_index_returns_videos_structure(): void
    {
        Video::factory(3)->create();

        $response = $this->getJson('/api/videos');

        $response->assertOk()
            ->assertJsonCount(3, 'data')
            ->assertJsonStructure([
                'status',
                'message',
                'data' => [
                    '*' => [
                        'id',
                        'title',
                        'description',
                        'url',
                        'thumbnail',
                        'duration',
                        'count_views',
                        'likes_count',
                        'user' => ['id', 'username', 'avatar_url'],
                        'created_at',
                        'updated_at',
                    ],
                ],
            ]);
    }

    /**
     * Test that the show endpoint returns the correct video details with the correct structure.
     */
    public function test_can_show_a_specific_video(): void
    {
        $video = Video::factory()->create(['title' => 'Laravel 12 Tutorial', 'description' => 'A great tutorial on Laravel 12 API testing.']);

        $response = $this->getJson("/api/videos/{$video->id}");

        $response->assertOk()
            ->assertJson([
                'data' => [
                    'id' => $video->id,
                    'title' => 'Laravel 12 Tutorial',
                    'description' => 'A great tutorial on Laravel 12 API testing.',
                    'user' => [
                        'id' => $video->user_id,
                    ],
                ],
            ]);
    }

    /**
     * Test that the comments endpoint returns a list of comments for a specific video.
     */
    public function test_can_list_comments_for_a_video(): void
    {
        $video = Video::factory()->create();
        Comment::factory(2)->create(['video_id' => $video->id]);

        $response = $this->getJson("/api/videos/{$video->id}/comments");

        $response->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('meta.comments_count', 2);
    }

    /**
     * Test that the increment views endpoint correctly increments the view count of a video.
     */
    public function test_increment_views_increments_count(): void
    {
        $video = Video::factory()->create(['count_views' => 5]);

        $response = $this->postJson("/api/videos/{$video->id}/view");

        $response->assertOk()
            ->assertJsonStructure([
                'status',
                'message',
                'data' => ['count_views'],
            ])
            ->assertJsonPath('data.count_views', 6);

        $this->assertDatabaseHas('videos', ['id' => $video->id, 'count_views' => 6]);
    }

    /**
     * Test that the recommendations endpoint returns videos from the same author when there are enough videos available.
     */
    public function test_recommendations_returns_same_author_videos(): void
    {
        $video = Video::factory()->create();
        $userId = $video->user_id;

        Video::factory()->count(6)->create(['user_id' => $userId]);
        Video::factory()->count(2)->create(); // other users

        $response = $this->getJson("/api/videos/{$video->id}/recommendations");

        $response->assertOk()
            ->assertJsonCount(6, 'data')
            ->assertJsonStructure([
                'status',
                'message',
                'data' => [
                    '*' => [
                        'id',
                        'title',
                        'user' => ['id', 'username', 'avatar_url'],
                    ],
                ],
            ]);

        $data = $response->json('data');

        foreach ($data as $item) {
            $this->assertNotEquals($video->id, $item['id']);
            $this->assertEquals($userId, $item['user']['id']);
        }
    }
}
