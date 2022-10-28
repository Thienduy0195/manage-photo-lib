<?php

namespace Database\Factories;

use App\Models\Content;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Content::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'desc' => $this->faker->text,
            'img1' => 'https://quickben.s3.us-west-2.amazonaws.com/dev/contents/image' . rand(2, 6) . '.jpg',
            'img2' => 'https://quickben.s3.us-west-2.amazonaws.com/dev/contents/image' . rand(2, 6) . '.jpg',
        ];
    }
}
