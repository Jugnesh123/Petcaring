<?php

use App\Http\Controllers\API\BookTransactionController;
use App\Http\Controllers\API\PetController;
use App\Http\Controllers\API\ServiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\SearchController;
use App\Http\Controllers\API\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::controller(SearchController::class)->group(function () {
    Route::prefix('search')->group(function () {
        Route::get('por', 'petorganization');
        // Route::get('pet', 'pet');
        // Route::get('species', 'species');
        // Route::get('breed', 'breed');
    });
});
Route::controller(UserController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::get("user/{id}","petorganizationByid");
    Route::get('otp', 'genrateOtp');
    Route::post('otp', 'checkOtp');
});
Route::controller(ServiceController::class)->group(function (){
    Route::prefix("service")->group(function(){
        Route::get("/{page?}", "getOrganizationService");
    });
});
Route::group(["middleware" => ["customauth"]], function () {
    Route::get("check", [UserController::class, "check"]);
    Route::controller(PetController::class)->group(function () {
        Route::prefix("pet")->group(function () {
            Route::post("add", 'add');
            Route::get("all", 'getAll');
            Route::get('delete/{id}', "delete");
            Route::post('update/{id}', "update");
            Route::get('image/{id}', "getimage");
            Route::post('image/remove/{id}', "removeimage");
            Route::post('image/{id}', "storeimage");
            Route::get("{id}", "get");
        });
    });
    Route::controller(BookTransactionController::class)->group(function () {
        Route::prefix("transaction")->group(function () {
            Route::post("/", "book");
            Route::get("/all", "getAll");
            Route::get("/{id}", "get");
            Route::get("cancel/{id}", "cancel");
        });
    });
});
