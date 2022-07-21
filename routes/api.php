<?php

use App\Http\Controllers\Api\ResourcesController;
use App\Http\Controllers\Api\ResourceTypesController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::name('api.')
    ->group(function () {
        Route::resource('resources', ResourcesController::class);
        Route::get('resource-types', [ResourceTypesController::class, 'index'])->name('resource-types.index');
    });
