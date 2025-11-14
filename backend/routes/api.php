<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::delete('/logout', [AuthController::class, 'logout']);

    Route::prefix('/user')->controller(UserController::class)->group(function () {
        Route::get('/{id}', 'show');
        Route::get('/{id}/videos', 'videos');
        Route::get('/{id}/liked-videos', 'likedVideos');
        Route::get('/{id}/liked-comments', 'likedComments');
    });
});
