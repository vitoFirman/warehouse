<?php

use App\Http\Controllers\Stock\StockIn;
use App\Http\Controllers\Stock\StockOut;
use Illuminate\Support\Facades\Route;

Route::prefix('api/stock')->group(function () {
    Route::post('/in', StockIn::class);
    Route::post('/out', StockOut::class);
});
