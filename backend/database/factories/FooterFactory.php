<?php

namespace Database\Factories;

use App\Models\Footer;
use Illuminate\Database\Eloquent\Factories\Factory;

class FooterFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Footer::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'img' => 'https://quickben.s3.us-west-2.amazonaws.com/dev/footers/' . rand(1, 5) . '.png',
        ];
    }
}
