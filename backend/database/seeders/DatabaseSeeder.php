<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Video;
use App\Models\Comment;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = User::factory(10)->create();
        $videos = Video::factory(30)->make()->each(function ($video) use ($users) {
            $video->user_id = $users->random()->id;
            $video->save();
        });

        $comments = Comment::factory(100)
            ->for($users->random())
            ->for($videos->random())
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
