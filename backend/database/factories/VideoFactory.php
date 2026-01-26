<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\File;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Video>
 */
class VideoFactory extends Factory
{
    // Video URLs cache
    private static ?array $videoUrls = null;

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
            'url' => $this->randomVideoUrl(),
            'thumbnail' => 'https://picsum.photos/300/200',
            'duration' => fake()->numberBetween(30, 7200), // duration in seconds
            'count_views' => fake()->numberBetween(0, 1000000),
            'user_id' => User::factory(),
        ];
    }

    /**
     * Get a random video URL from the JSON file.
     */
    private function randomVideoUrl(): string
    {
        if (self::$videoUrls === null) {
            $path = base_path('database/data/video_urls.json');
            self::$videoUrls = json_decode(File::get($path), true) ?? [];
        }

        return self::$videoUrls !== []
            ? fake()->randomElement(self::$videoUrls)
            : fake()->url();
    }
}
