<?php

namespace Tests\Feature\Endpoints;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that a user can register successfully and receive a user resource.
     */
    public function test_register_creates_user_and_returns_resource(): void
    {
        $payload = [
            'username' => 'newuser',
            'email' => 'newuser@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->postJson('/api/register', $payload);

        $response->assertCreated()
            ->assertJsonStructure([
                'data' => ['id', 'username', 'email'],
            ])
            ->assertJsonPath('data.email', 'newuser@example.com');

        $this->assertDatabaseHas('users', ['email' => 'newuser@example.com']);

        $user = User::where('email', 'newuser@example.com')->first();
        $this->assertAuthenticatedAs($user, 'sanctum');
    }

    /**
     * Test that login with valid credentials returns the user resource.
     */
    public function test_login_with_valid_credentials_returns_user(): void
    {
        $password = 'secret123';
        $user = User::factory()->create(['password' => $password]); // The cast in the model will hash the password

        $response = $this->postJson('/api/login', ['email' => $user->email, 'password' => $password]);

        $response->assertOk()
            ->assertJsonStructure([
                'data' => ['id', 'username', 'email'],
            ])
            ->assertJsonPath('data.email', $user->email);

        $this->assertAuthenticatedAs($user, 'sanctum');
    }

    /**
     * Test that login with invalid credentials returns a 401 error with the correct message.
     */
    public function test_login_with_invalid_credentials_returns_401(): void
    {
        $user = User::factory()->create(['password' => 'rightpassword']); // The cast in the model will hash the password

        $this->postJson('/api/login', ['email' => $user->email, 'password' => 'wrongpass'])
            ->assertUnauthorized()
            ->assertJsonPath('data.message', 'Invalid credentials');
    }
}
