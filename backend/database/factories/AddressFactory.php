<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use \App\Models\State;
use \App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Address>
 */
class AddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "housenumber" => Str::random(20),
            "landmark" => Str::random(40),
            "area" => Str::random(30),
            "district" => Str::random(50),
            "pincode" => mt_rand(100000, 999999),
            "state" => State::factory(),
            "user" => User::factory(),
        ];
    }
}
