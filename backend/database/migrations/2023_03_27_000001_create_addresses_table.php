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
        Schema::create('addresses', function (Blueprint $table) {
            $table->id('id');
            $table->bigInteger('user')->unsigned()->nullable();
            $table->foreign('user')->references('id')->on('users')->onDelete('cascade');
            $table->text('housenumber')->nullable();
            $table->text('landmark')->nullable();
            $table->text('area')->nullable();
            $table->text('pincode')->nullable();
            $table->text('district')->nullable();
            $table->bigInteger('state')->unsigned()->nullable();
            $table->foreign('state')->references('id')->on('states')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
