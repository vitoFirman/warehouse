<?php

use Illuminate\Support\Facades\Route;

Route::prefix('api/stock')->group(function () {
    Route::post('/in');
    Route::post('/out');
});
