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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("petowner")->nullable();
            $table->foreign('petowner')->references('id')->on('users')->onDelete('set null');
            $table->unsignedBigInteger("pet")->nullable();
            $table->foreign('pet')->references('id')->on('pets')->onDelete('set null');
            $table->unsignedBigInteger("petorganization")->nullable();
            $table->foreign('petorganization')->references('id')->on('users')->onDelete('set null');
            $table->unsignedBigInteger("service")->nullable();
            $table->foreign('service')->references('id')->on('services')->onDelete('set null');
            $table->double("price");
            $table->unsignedTinyInteger("status");
            $table->timestamp("startdate")->default(DB::raw("CURRENT_TIMESTAMP"));
            $table->timestamp("enddate")->default(DB::raw("CURRENT_TIMESTAMP"));
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
