<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthControlador;
use App\Http\Controllers\Api\V1\ProductoControlador;

Route::prefix('v1')->group(function () {

    // Auth (rate limit estricto contra fuerza bruta / alta masiva de cuentas)
    Route::prefix('auth')->middleware('throttle:auth')->group(function () {
        Route::post('registro', [AuthControlador::class, 'registro']);
        Route::post('login', [AuthControlador::class, 'login']);
        Route::middleware('auth:sanctum')->post('logout', [AuthControlador::class, 'logout']);
    });

    // Productos (protegido por token + rate limit general)
    Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {
        Route::get('productos', [ProductoControlador::class, 'index']);
        Route::post('productos', [ProductoControlador::class, 'store']);
        Route::get('productos/{producto}', [ProductoControlador::class, 'show']);
        Route::put('productos/{producto}', [ProductoControlador::class, 'update']);
        Route::patch('productos/{producto}', [ProductoControlador::class, 'update']);
        Route::delete('productos/{producto}', [ProductoControlador::class, 'destroy']);
    });
});
