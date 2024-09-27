<?php

use App\Http\Controllers\Product\CreateProduct;
use App\Http\Controllers\Product\ProductList;
use App\Http\Controllers\Product\UpdateProduct;
use Illuminate\Support\Facades\Route;

Route::prefix('api/product')->group(function () {
    Route::get('/list', ProductList::class)->middleware('auth:sanctum', 'ability:manage-stock');
    Route::post('/create', CreateProduct::class)->middleware('auth:sanctum', 'ability:manage-stock');
    Route::post('/update/{code}', UpdateProduct::class)->middleware('auth:sanctum', 'ability:manage-stock');
});
