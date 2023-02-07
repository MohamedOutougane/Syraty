<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// récuperer tout les posts
Route::get('posts', [PostController::class, 'getPosts']);

// récuperer tout les posts correspondant à l'id
Route::get('post/{id}', [PostController::class, 'getPostById']);

// créer un post
Route::post('addPost', [PostController::class, 'addPost']);

// supprimer un post
Route::delete('deletePost/{id}', [PostController::class, 'deletePost']);

// // modifier un post
// Route::put('updatePost/{id}', [PostController::class, 'updatePost']);