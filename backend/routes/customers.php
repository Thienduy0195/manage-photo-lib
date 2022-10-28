<?php

use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| customers Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "customers" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:customers')->get('/user', function (Request $request) {
    return $request->user();
});


Route::name('customers.users.')->group(function () {
    Route::get('v1/users', [UserController::class, 'index'])->name('index');
    Route::post('v1/users', [UserController::class, 'store'])->name('store');
    Route::get('v1/users/{id}', [UserController::class, 'show'])->name('show');
    Route::put('v1/users/{id}', [UserController::class, 'update'])->name('update');
    Route::delete('v1/users/{id}', [UserController::class, 'destroy'])->name('destroy');
});

Route::name('customers.posts.')->group(function () {
    Route::get('v1/posts', [UserController::class, 'index'])->name('index');
});

