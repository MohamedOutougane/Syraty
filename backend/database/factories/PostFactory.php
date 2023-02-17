<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            // making faker values here
            "title" => $this->faker->sentence(rand(1,3), true),
            "body" => $this->faker->paragraph(rand(1,4), true),
            "slug" => $this->faker->slug(rand(1,4), true),
            "image" => $this->faker->imageUrl(640, 480, 'cats', true, 'Faker'),
            "public" => $this->faker->boolean(50),
        ];
    }
}
