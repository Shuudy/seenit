<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\User;
use App\Models\Video;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Test user creation
        User::factory()->create([
            'username' => 'testuser',
            'email' => 'test@example.com',
            'bio' => 'This is a test user.',
        ]);

        $users = User::factory(10)->create();
        $videos = Video::factory(30)->make()->each(function ($video) use ($users) {
            $video->user_id = $users->random()->id;
            $video->save();
        });

        $comments = Comment::factory(100)
            ->recycle($users)
            ->recycle($videos)
            ->create();

        foreach ($videos as $video) {
            $likedUsers = $users->random(rand(0, 10))->pluck('id');
            $video->likedBy()->attach($likedUsers);
        }

        foreach ($comments as $comment) {
            $likedUsers = $users->random(rand(0, 5))->pluck('id');
            $comment->likedBy()->attach($likedUsers);
        }
    }
}
