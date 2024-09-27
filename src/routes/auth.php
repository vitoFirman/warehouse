<?php

use App\Http\Controllers\Auth\Login;
use Illuminate\Support\Facades\Route;

Route::prefix('api/auth')->group(function () {
    Route::post('/login', Login::class);
});
