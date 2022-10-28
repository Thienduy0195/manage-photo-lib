<?php

namespace Database\Factories;

use App\Models\Header;
use Illuminate\Database\Eloquent\Factories\Factory;

class HeaderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Header::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => 'BEN QUICK OFFICIAL',
            'desc' => 'Ben Quick work merges Fine Art and Documentary styles. His Vietnam travel photography depicts ethnic culture, landscapes, and portraits with emotions.',
        ];
    }
}
