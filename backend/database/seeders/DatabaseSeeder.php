<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            CategorySeeder::class,
            PostSeeder::class,
            // GallerySeeder::class,
            HeaderSeeder::class,
            SliderSeeder::class,
            ContentSeeder::class,
            FooterSeeder::class,
            AboutSeeder::class,
        ]);
    }
}
