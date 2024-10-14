<?php

use App\Http\Controllers\Suplier\CreateSuplier;
use App\Http\Controllers\Suplier\DeleteSuplier;
use App\Http\Controllers\Suplier\SuplierList;
use App\Http\Controllers\Suplier\UpdateSuplier;
use Illuminate\Support\Facades\Route;

Route::prefix('api/suplier')->group(function () {
    Route::get('/list', SuplierList::class)->middleware('auth:sanctum', 'ability:manage-suplier,view-suplier');
    Route::post('/create', CreateSuplier::class)->middleware('auth:sanctum', 'ability:manage-suplier');
    Route::put('/update/{code}', UpdateSuplier::class)->middleware('auth:sanctum', 'ability:manage-suplier');
    Route::delete('/delete/{code}', DeleteSuplier::class)->middleware('auth:sanctum', 'ability:manage-suplier');
});
