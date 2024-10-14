<?php

use App\Http\Controllers\Reports\StockReports;
use Illuminate\Support\Facades\Route;

Route::prefix('api/reports')->group(function () {
    Route::get('/stock/{month}', StockReports::class)->middleware('auth:sanctum');
});
