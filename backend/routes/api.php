<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::delete('/logout', [AuthController::class, 'logout']);

    Route::get('/user/{id}', [UserController::class, 'show']);
    Route::get('/user/{id}/videos', [UserController::class, 'videos']);
    Route::get('/user/{id}/liked-videos', [UserController::class, 'likedVideos']);
    Route::get('/user/{id}/liked-comments', [UserController::class, 'likedComments']);
});
