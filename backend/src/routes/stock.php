<?php

use App\Http\Controllers\Stock\StockIn;
use App\Http\Controllers\Stock\StockInList;
use App\Http\Controllers\Stock\StockInUpdate;
use App\Http\Controllers\Stock\StockOut;
use App\Http\Controllers\Stock\StockOutList;
use App\Http\Controllers\Stock\StockOutUpdate;
use Illuminate\Support\Facades\Route;

Route::prefix('api/stock')->group(function () {
    Route::post('/in', StockIn::class)->middleware('auth:sanctum', 'ability:manage-stock');
    Route::post('/out', StockOut::class)->middleware('auth:sanctum', 'ability:manage-stock');
    Route::get('/in/list', StockInList::class)->middleware('auth:sanctum', 'ability:manage-stock');
    Route::get('/out/list', StockOutList::class)->middleware('auth:sanctum', 'ability:manage-stock');
    Route::put('/in/update/{id}', StockInUpdate::class)->middleware('auth:sanctum', 'ability:manage-stock');
    Route::put('/out/update/{id}', StockOutUpdate::class)->middleware('auth:sanctum', 'ability:manage-stock');
});
