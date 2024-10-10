<?php

use App\Http\Controllers\Product\CreateProduct;
use App\Http\Controllers\Product\ProductListAll;
use App\Http\Controllers\Product\ProductListPaginate;
use App\Http\Controllers\Product\UpdateProduct;
use Illuminate\Support\Facades\Route;

Route::prefix('api/product')->group(function () {
    Route::get('/list/paginate', ProductListPaginate::class)->middleware('auth:sanctum', 'ability:manage-stock');
    Route::get('/list', ProductListAll::class)->middleware('auth:sanctum', 'ability:manage-stock');
    Route::post('/create', CreateProduct::class)->middleware('auth:sanctum', 'ability:manage-stock');
    Route::put('/update/{code}', UpdateProduct::class)->middleware('auth:sanctum', 'ability:manage-stock');
});
