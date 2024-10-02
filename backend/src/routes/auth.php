<?php

use App\Http\Controllers\Auth\Login;
use App\Http\Controllers\Auth\Logout;
use Illuminate\Support\Facades\Route;

Route::prefix('api/auth')->group(function () {
    Route::post('/login', Login::class);
    Route::post('/logout', Logout::class)->middleware('auth:sanctum');
});
