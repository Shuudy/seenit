<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\VideoController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

Route::prefix('/videos')->controller(VideoController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/{video}', 'show');
    Route::post('/{video}/view', 'incrementViews');

    Route::middleware('auth:sanctum')->group(function () {
        Route::put('/{video}', 'update');
        Route::post('/', 'store');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::delete('/logout', [AuthController::class, 'logout']);
});
