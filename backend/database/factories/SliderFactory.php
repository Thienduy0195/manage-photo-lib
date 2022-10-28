<?php

namespace Database\Factories;

use App\Models\Slider;
use Illuminate\Database\Eloquent\Factories\Factory;

class SliderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Slider::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'header_id' => 1,
            'img' => 'https://quickben.s3.us-west-2.amazonaws.com/dev/sliders/' . rand(1, 5) . '.png',
        ];
    }
}
