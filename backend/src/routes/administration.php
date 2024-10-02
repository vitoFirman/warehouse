<?php

use App\Http\Controllers\Administration\CreateUser;
use App\Http\Controllers\Administration\DeleteUser;
use App\Http\Controllers\Administration\UserList;
use Illuminate\Support\Facades\Route;

Route::prefix('api/administration')->group(function () {
    Route::post('user/create', CreateUser::class)->middleware('auth:sanctum', 'ability:manage-users');
    Route::get('user/list', UserList::class)->middleware('auth:sanctum', 'ability:manage-users');
    Route::delete('user/delete/{id}', DeleteUser::class)->middleware('auth:sanctum', 'ability:manage-users');
});
