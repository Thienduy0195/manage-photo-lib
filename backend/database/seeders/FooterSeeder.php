<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Footer;
use Faker\Generator as Faker;

class FooterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Footer::factory()
            ->count(5)
            ->create();
    }
}
