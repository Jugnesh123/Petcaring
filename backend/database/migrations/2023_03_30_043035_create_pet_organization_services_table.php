<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pet_organization_services', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("petorganization")->nullable();
            $table->foreign('petorganization')->references('id')->on('users')->onDelete('set null');
            $table->unsignedBigInteger("service")->nullable();
            $table->foreign('service')->references('id')->on('services')->onDelete('cascade');
            $table->double("price");
            $table->boolean("perday")->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pet_organization_services');
    }
};
