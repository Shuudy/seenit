<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Resources\ErrorResource;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::delete('/logout', [AuthController::class, 'logout']);

    Route::prefix('/users')->controller(UserController::class)->group(function () {
        Route::get('/{id}', 'show');
        Route::get('/{id}/videos', 'videos');
        Route::get('/{id}/liked-videos', 'likedVideos');
        Route::get('/{id}/liked-comments', 'likedComments');
    });
});

Route::fallback(function () {
    return new ErrorResource([
        'message' => 'Endpoint not found.',
        'status_code' => 404,
    ]);
});
