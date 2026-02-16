<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VideoController;
use App\Http\Resources\ErrorResource;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->prefix('/me')->group(function () {
    Route::get('/', function (Request $request) {
        return new UserResource($request->user());
    });

    // Update authenticated user profile
    Route::patch('/', [UserController::class, 'update']);

    // Update authenticated user profile images
    Route::post('/images', [UserController::class, 'updateImages']);
});

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

Route::prefix('/videos')->controller(VideoController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/{video}', 'show');
    Route::get('/{video}/comments', 'comments');
    Route::get('/{video}/recommendations', 'recommendations');
    Route::post('/{video}/view', 'incrementViews');

    Route::middleware('auth:sanctum')->group(function () {
        Route::put('/{video}', 'update')->middleware('can:update,video');
        Route::post('/{video}/like', 'like');
        Route::post('/', 'store');
        Route::delete('/{video}', 'delete')->middleware('can:delete,video');
        Route::post('/{video}/comments', 'storeComment');
    });
});

Route::prefix('/comments')->middleware('auth:sanctum')->controller(CommentController::class)->group(function () {
    Route::post('/{comment}/like', 'like');
    Route::put('/{comment}', 'update')->middleware('can:update,comment');
    Route::delete('/{comment}', 'delete')->middleware('can:delete,comment');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::delete('/logout', [AuthController::class, 'logout']);
});

Route::prefix('/users')->controller(UserController::class)->group(function () {
    Route::get('/{user}', 'show');
    Route::get('/{user}/videos', 'videos');
    Route::get('/{user}/liked-videos', 'likedVideos');
    Route::get('/{user}/liked-comments', 'likedComments');
});

Route::fallback(function () {
    return new ErrorResource([
        'message' => 'Endpoint not found.',
        'status_code' => 404,
    ]);
});
