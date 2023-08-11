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
        Schema::table('pet_organization_services', function (Blueprint $table) {
            $table->unsignedBigInteger("breed")->nullable();
            $table->foreign('breed')->references('id')->on('breeds')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pet_organization_services', function (Blueprint $table) {
            $table->dropForeign('pet_organization_services_breed_foreign');
            $table->removeColumn("breed");
        });
    }
};
