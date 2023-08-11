<?php

namespace Database\Factories;

use App\Models\Breed;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PetOrganizationService>
 */
class PetOrganizationServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "petorganization" => 1,
            "service" => Service::factory(),
            "price" => random_int(200, 999),
            "perday"=>fake()->boolean(),
            "description" => fake()->text(),
            "breed" => Breed::factory(),
        ];
    }
}
