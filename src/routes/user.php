<?php

use App\Http\Controllers\Users\Info;
use App\Http\Controllers\Users\UpdatePassword;
use Illuminate\Support\Facades\Route;

Route::prefix('api/user')->group(function () {
    Route::get('/info', Info::class)->middleware('auth:sanctum');
    Route::post('/update-password', UpdatePassword::class)->middleware('auth:sanctum');
});
