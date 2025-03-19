<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

// Route::get('dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('dashboard/user', function () {
    return response()->json(Auth::user());
})->middleware(['auth'])->name('dashboard.user');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::view('/{route?}', 'app')->where('route', '.*')->name('app');
