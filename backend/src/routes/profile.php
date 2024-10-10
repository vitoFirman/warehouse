<?php

use App\Http\Controllers\Profile\Info;
use App\Http\Controllers\Profile\UpdateProfile;
use App\Http\Controllers\Profile\UploadPhoto;
use Illuminate\Support\Facades\Route;

Route::prefix('api/profile')->group(function () {
    Route::get('/info', Info::class)->middleware('auth:sanctum');
    Route::post('/upload-photo', UploadPhoto::class)->middleware('auth:sanctum');
    Route::put('/update', UpdateProfile::class)->middleware('auth:sanctum');
});
