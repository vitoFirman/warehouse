<?php

use Illuminate\Support\Facades\Route;

include 'administration.php';
include 'auth.php';
include 'user.php';
include 'profile.php';
include 'product.php';
include 'suplier.php';
include 'stock.php';
include 'ability.php';
include 'reports.php';

Route::get('/', function () {
    return view('welcome');
});
