<?php

namespace App\Support;

use Illuminate\Http\JsonResponse;

/**
 * Trait para estandarizar respuestas JSON.
 */
trait ApiRespuesta
{
    /**
     * Respuesta exitosa.
     */
    protected function ok(mixed $data = null, string $message = 'OK', int $status = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], $status);
    }

    /**
     * Respuesta de error.
     */
    protected function fail(string $message, int $status = 400, mixed $errors = null): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors,
        ], $status);
    }
}
