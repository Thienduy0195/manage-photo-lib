<?php

namespace Database\Factories;

use App\Models\AboutPage;
use Illuminate\Database\Eloquent\Factories\Factory;

class AboutPageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = AboutPage::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'img' => 'https://quickben.s3.us-west-2.amazonaws.com/dev/galleries/' . rand(1, 7) . '.jpg',
            'desc' => "Ben Quick spent several years exploring the deserts and mountain ranges in the Western US before settling down, becoming a proud father, and earning a BS in natural resource management and an MS in American Studies from Utah State University in Logan, Utah. After completing his Master's degree Ben and his son moved to Tuscon, Arizona where Ben earned his MFA in nonfiction writing at the University of Arizona while serving as the Beverly Rogers Nonfiction Fellow. During graduate school, Ben discovered a passion for teaching. Since then, he’s spent nearly 20 years teaching academic and creative writing to university students in the US and Vietnam."
        ];
    }
}
