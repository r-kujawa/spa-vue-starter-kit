<?php

use Illuminate\Support\Facades\Route;

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::view('/dashboard/reset-password/{token}', 'app')->name('password.reset');
Route::view('/{route?}', 'app')->where('route', '.*')->name('app');
