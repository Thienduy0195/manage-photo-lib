<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Post::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->text,
            'desc' => $this->faker->address,
            'image' => 'https://quickben.s3.us-west-2.amazonaws.com/dev/posts/' . rand(1, 7) . '.jpg',
            'content' => $this->faker->text,
        ];
    }
}
