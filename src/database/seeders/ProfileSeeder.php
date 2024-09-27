<?php

namespace Database\Seeders;

use App\Models\UserProfile;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        UserProfile::insert([
            'userid' => 1,
            'first_name' => 'admin',
            'last_name' => 'admin1',
            'address' => 'Jl soekarno hatta no 34',
            'city' => 'malang',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
