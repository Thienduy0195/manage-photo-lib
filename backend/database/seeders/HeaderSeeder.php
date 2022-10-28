<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Header;
use Faker\Generator as Faker;

class HeaderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Header::factory()
            ->count(1)
            ->create();
    }
}
