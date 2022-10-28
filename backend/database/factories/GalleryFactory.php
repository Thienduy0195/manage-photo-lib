<?php

namespace Database\Factories;

use App\Models\Gallery;
use Illuminate\Database\Eloquent\Factories\Factory;

class GalleryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Gallery::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->name,
            'location' => $this->faker->address,
            'image' => 'https://quickben.s3.us-west-2.amazonaws.com/dev/galleries/' . rand(1, 7) . '.jpg',
            'description' => $this->faker->text,
            'price' => rand(1, 100),
            'category_id' => rand(1, 3)
        ];
    }
}
