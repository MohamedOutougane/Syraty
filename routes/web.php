<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// je veux que la route "/" soit gérée par le controller "PostController" et la méthode "indexHome"
Route::get('/', [PostController::class, 'indexHome'])->name('index');


// je veux que la route "/" soit gérée par le controller "PostController" et la méthode "index"
Route::get('/posts', [PostController::class, 'index'])->name('posts.index')->middleware('auth');
// cette méthode permet de dire que le crud passe par le controller "PostController" excepté la méthode "indexHome"
Route::resource('posts', PostController::class)->except('indexHome'); // add : " ->middleware('auth'); " to protect the route by authentification



// Route::get('/', function () {
//     return view('welcome');
// });

// cette route permet de rediriger l'utilisateur vers la page "dashboard" après qu'il se soit authentifié
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
