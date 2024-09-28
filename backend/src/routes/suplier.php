<?php

use App\Http\Controllers\Suplier\CreateSuplier;
use App\Http\Controllers\Suplier\SuplierList;
use App\Http\Controllers\Suplier\UpdateSuplier;
use Illuminate\Support\Facades\Route;

Route::prefix('api/suplier')->group(function () {
    Route::get('/list', SuplierList::class)->middleware('auth:sanctum', 'ability:manage-suplier,view-suplier');
    Route::post('/create', CreateSuplier::class)->middleware('auth:sanctum', 'ability:manage-suplier');
    Route::post('/update/{id}', UpdateSuplier::class)->middleware('auth:sanctum', 'ability:manage-suplier');
});
