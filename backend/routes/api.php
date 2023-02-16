<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController;

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

// code de base
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

//Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {

    // supprimer un post
    Route::delete('deletePost/{id}', [PostController::class, 'deletePost']);

    Route::post('logout', [AuthController::class, 'logout']);

    // // modifier un post
    // Route::put('updatePost/{id}', [PostController::class, 'updatePost']);
});


// Route publique

// créer un post
Route::post('addPost', [PostController::class, 'addPost']);

// récuperer tout les posts de l'utilisateur connecté
Route::get('userPosts/{id}', [PostController::class, 'getUserPosts']);

// inscrire un nouvel utilisateur
Route::post('register', [AuthController::class, 'register']);

// connecter un utilisateur
Route::post('login', [AuthController::class, 'login']);

// récuperer tout les posts
Route::get('posts', [PostController::class, 'getPosts']);

// récuperer tout les posts correspondant à l'id
Route::get('post/{id}', [PostController::class, 'getPostById']);

// récuperer tout les posts correspondant à la recherche
Route::post('search', [PostController::class, 'getPostsBySearch']);



