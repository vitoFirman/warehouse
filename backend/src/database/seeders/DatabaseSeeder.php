<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserProfile;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        User::insert([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('punt3n123'),
            'role' => 'admin',
            'created_at' => now(),
            'updated_at' => now()
        ]);

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
