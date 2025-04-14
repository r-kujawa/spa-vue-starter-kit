<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

// Route::get('dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::view('/dashboard/reset-password/{token}', 'app')->name('password.reset');
Route::view('/{route?}', 'app')->where('route', '.*')->name('app');
