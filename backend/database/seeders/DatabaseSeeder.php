<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Pet;
use App\Models\PetOrganizationService;
use Illuminate\Database\Seeder;
use \App\Models\User;
use \App\Models\Address;
use \App\Models\State;
use \App\Models\Country;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Address::factory(10)->create();
        // Pet::factory(10)->create();
        PetOrganizationService::factory(100)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
