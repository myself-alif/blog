<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/auth/getLoginURL', [AuthController::class, "getLoginURL"]);
Route::get('/auth/loginCallback', [AuthController::class, "loginCallback"]);
Route::get('/posts', [PostController::class, "posts"]);
Route::get('/posts/{title}', [PostController::class, "singlePost"]);
Route::get('/categories', [CategoryController::class, "categories"]);
Route::get('/categories/{category}', [CategoryController::class, "postsByCategory"]);
Route::get('/search/{searchInputValue}', [PostController::class, "postsByTitle"]);

Route::middleware('auth:sanctum')->group(function () {
    Route::post("/posts/delete/{title}", [PostController::class, "deletePost"]);
    Route::post('/auth/logout', [AuthController::class, "logout"]);
    Route::post('/posts/insert', [PostController::class, "insertPost"]);
});
