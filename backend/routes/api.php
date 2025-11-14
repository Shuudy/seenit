<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\VideoController;
use App\Http\Resources\ErrorResource;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

Route::prefix('/videos')->controller(VideoController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/{video}', 'show');
    Route::get('/{video}/comments', 'comments');
    Route::post('/{video}/view', 'incrementViews');

    Route::middleware('auth:sanctum')->group(function () {
        Route::put('/{video}', 'update')->middleware('can:update,video');
        Route::post('/{video}/like', 'like');
        Route::post('/', 'store');
        Route::delete('/{video}', 'delete')->middleware('can:delete,video');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::delete('/logout', [AuthController::class, 'logout']);
});

Route::fallback(function () {
    return new ErrorResource([
        'message' => 'Endpoint not found.',
        'status_code' => 404,
    ]);
});
