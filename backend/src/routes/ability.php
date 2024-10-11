<?php

use App\Http\Controllers\Ability\CheckAbility;
use Illuminate\Support\Facades\Route;

Route::prefix('api/ability')->group(function () {
    Route::get('/check/{ability}', CheckAbility::class)->middleware('auth:sanctum');
});
