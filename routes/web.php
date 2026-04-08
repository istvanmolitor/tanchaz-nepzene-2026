<?php

use App\Http\Controllers\SongController;
use Illuminate\Support\Facades\Route;

Route::get('/', [SongController::class, 'index']);
Route::get('/api/songs', [SongController::class, 'songs']);
