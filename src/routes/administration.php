<?php

use App\Http\Controllers\Administration\CreateUser;
use Illuminate\Support\Facades\Route;

Route::prefix('api/administration')->group(function () {
    Route::post('user/create', CreateUser::class)->middleware('auth:sanctum', 'ability:manage-users');
});
