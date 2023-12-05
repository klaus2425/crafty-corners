<?php

use App\Http\Controllers\api\UpdateProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\UserController;
use App\Http\Controllers\api\CommunityController;
use App\Http\Controllers\api\PostController;
use App\Http\Controllers\api\CommentController;

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


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('/users', UserController::class);
    Route::apiResource('communities', CommunityController::class);
    Route::apiResource('/posts', PostController::class);
    Route::apiResource('/comments', CommentController::class);
    Route::post('/users/{user}/join-community/{community}', [UserController::class, 'joinCommunity'])
    ->name('users.joinCommunity');

});

Route::get('/communities', [CommunityController::class, 'index']);
Route::get('/communities/{id}', [CommunityController::class, 'show']);

Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{id}', [PostController::class, 'show']);

Route::get('/comments', [CommentController::class, 'index']);
Route::get('/comments/{id}', [CommentController::class, 'show']);


Route::post('/register', [AuthController::class, 'register']);
Route:: post('/login', [AuthController::class, 'login']);
