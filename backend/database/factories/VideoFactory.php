<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Video>
 */
class VideoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(5),
            'description' => fake()->paragraph(),
            'url' => fake()->url(),
            'duration' => fake()->numberBetween(30, 7200), // duration in seconds
            'count_views' => fake()->numberBetween(0, 1000000),
            'user_id' => User::factory(),
        ];
    }
}
