<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'username' => fake()->userName(),
            'email' => fake()->unique()->safeEmail(),
            'password' => static::$password ??= Hash::make('password'),
            'bio' => fake()->paragraph(),
            'avatar_url' => fake()->boolean(50) ? 'https://picsum.photos/300/200?random='.fake()->unique()->uuid() : null,
            'banner_url' => 'https://picsum.photos/800/200?random='.fake()->unique()->uuid(),
        ];
    }
}
