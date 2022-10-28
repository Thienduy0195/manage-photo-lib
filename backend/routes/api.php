<?php

use App\Http\Controllers\Api\AboutPageController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\OrderController;
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

Route::post('/v1/login', [AuthController::class, 'login'])->name('login');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'auth:api'], function () {
    Route::get('/v1/profile', [AuthController::class, 'profile'])->name('profile');
    Route::delete('/v1/logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('/v1/refresh-token', [AuthController::class, 'refreshToken'])->name('refreshToken');

    Route::name('api.home-pages.')->group(function () {
        Route::post('v1/home-pages', [HomeController::class, 'update'])->name('update');
    });

    Route::name('api.aboutPages.')->group(function () {
        Route::post('v1/aboutPages', [AboutPageController::class, 'update'])->name('update');
    });

    Route::name('api.users.')->group(function () {
        Route::post('v1/users', [UserController::class, 'store'])->name('store');
        Route::put('v1/users/{id}', [UserController::class, 'update'])->name('update');
        Route::delete('v1/users/{id}', [UserController::class, 'destroy'])->name('destroy');
    });

    Route::name('api.posts.')->group(function () {
        Route::post('v1/posts', [PostController::class, 'store'])->name('store');
        Route::put('v1/posts/{id}', [PostController::class, 'update'])->name('update');
        Route::delete('v1/posts/{id}', [PostController::class, 'destroy'])->name('destroy');
    });

    Route::name('api.galleries.')->group(function () {
        Route::post('v1/galleries', [GalleryController::class, 'store'])->name('store');
        Route::put('v1/galleries/{id}', [GalleryController::class, 'update'])->name('update');
        Route::delete('v1/galleries/{id}', [GalleryController::class, 'destroy'])->name('destroy');
    });

    Route::name('api.orders.')->group(function () {
        Route::get('v1/orders', [OrderController::class, 'index'])->name('index');
    });
});

Route::name('api.users.')->group(function () {
    Route::get('v1/users', [UserController::class, 'index'])->name('index');
    Route::get('v1/users/{id}', [UserController::class, 'show'])->name('show');
});

Route::name('api.posts.')->group(function () {
    Route::get('v1/posts', [PostController::class, 'index'])->name('index');
    Route::get('v1/posts/{id}', [PostController::class, 'show'])->name('show');
});

Route::name('api.galleries.')->group(function () {
    Route::get('v1/galleries', [GalleryController::class, 'index'])->name('index');
    Route::get('v1/galleries/{id}', [GalleryController::class, 'show'])->name('show');
});

Route::name('api.homes.')->group(function () {
    Route::get('v1/homes', [HomeController::class, 'index'])->name('index');
});

Route::name('api.categories.')->group(function () {
    Route::get('v1/categories', [CategoryController::class, 'index'])->name('index');
});

Route::name('api.aboutPages.')->group(function () {
    Route::get('v1/aboutPages', [AboutPageController::class, 'index'])->name('index');
});

Route::name('api.orders.')->group(function () {
    Route::post('v1/orders', [OrderController::class, 'store'])->name('store');
});


// Route::group(['middleware' => 'auth:api'], function () {
//     Route::name('api.posts.')->group(function () {
//         Route::post('v1/posts', [PostController::class, 'store'])->name('store');
//         Route::get('v1/posts/{id}', [PostController::class, 'show'])->name('show');
//         Route::put('v1/posts/{id}', [PostController::class, 'update'])->name('update');
//         Route::delete('v1/posts/{id}', [PostController::class, 'destroy'])->name('destroy');
//     });

//     Route::name('api.galleries.')->group(function () {
//         Route::post('v1/galleries', [PostController::class, 'store'])->name('store');
//         Route::get('v1/galleries/{id}', [PostController::class, 'show'])->name('show');
//         Route::put('v1/galleries/{id}', [PostController::class, 'update'])->name('update');
//         Route::delete('v1/galleries/{id}', [PostController::class, 'destroy'])->name('destroy');
//     });
// });
