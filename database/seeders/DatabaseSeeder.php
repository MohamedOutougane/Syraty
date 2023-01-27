<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Rating;
use App\Models\Post;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // Algorithme de creation de 10 users avec 1 à 4 posts chaqun avec une note (ratings) aléatoire
        $rating = Rating::factory(10)->create();
        User::factory(10)->create()->each(function ($user) use ($rating) {
            Post::factory(rand(1,4))->create([
                'user_id' => $user->id,
                'rating_id' => ($rating->random(1)->first())->id,
            ]);
        });
        
    }
}
