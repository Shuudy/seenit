<?php

namespace Tests\Feature\Endpoints;

use App\Models\User;
use App\Models\Video;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that the authenticated user can retrieve their profile information.
     */
    public function test_get_current_user_profile(): void
    {
        $user = User::factory()->create();
        Video::factory()->count(1)->create(['user_id' => $user->id]);

        $response = $this->actingAs($user, 'sanctum')->getJson('/api/me');

        $response->assertOk()
            ->assertJsonStructure([
                'data' => ['id', 'username', 'email', 'videos_count', 'avatar_url', 'banner_url'],
            ])
            ->assertJsonPath('data.id', $user->id);
    }

    /**
     * Test that the authenticated user can update their profile information.
     */
    public function test_update_profile_updates_fields(): void
    {
        $user = User::factory()->create(['username' => 'old', 'email' => 'old@email.com', 'bio' => 'old bio']);

        $payload = ['username' => 'newname', 'email' => 'new@email.com', 'bio' => 'new bio'];

        $response = $this->actingAs($user, 'sanctum')->patchJson('/api/me', $payload);

        $response->assertOk()
            ->assertJsonStructure([
                'status',
                'message',
                'data' => ['id', 'username', 'email', 'bio'],
            ])
            ->assertJsonPath('data.username', 'newname')
            ->assertJsonPath('data.email', 'new@email.com')
            ->assertJsonPath('data.bio', 'new bio');

        $this->assertDatabaseHas('users', ['id' => $user->id, 'username' => 'newname', 'email' => 'new@email.com', 'bio' => 'new bio']);
    }

    /**
     * Test that the authenticated user can update their profile images.
     */
    public function test_update_profile_images_stores_files_and_updates_user(): void
    {
        $user = User::factory()->create();

        Storage::fake('public');

        $avatar = UploadedFile::fake()->image('avatar.jpg');
        $banner = UploadedFile::fake()->image('banner.jpg');

        $response = $this->actingAs($user, 'sanctum')->postJson('/api/me/images', [
            'avatar' => $avatar,
            'banner' => $banner,
        ]);

        $response->assertOk()
            ->assertJsonStructure([
                'status',
                'message',
                'data' => ['id', 'username', 'avatar_url', 'banner_url'],
            ]);

        $avatarUrl = $response->json('data.avatar_url');
        $bannerUrl = $response->json('data.banner_url');

        $baseUrl = url(Storage::url(''));
        $avatarPath = ltrim(str_replace($baseUrl, '', $avatarUrl), '/');
        $bannerPath = ltrim(str_replace($baseUrl, '', $bannerUrl), '/');

        Storage::disk('public')->assertExists($avatarPath);
        Storage::disk('public')->assertExists($bannerPath);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'avatar_url' => $avatarUrl,
            'banner_url' => $bannerUrl,
        ]);
    }
}
