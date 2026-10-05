<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Support\ApiRespuesta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

/**
 * Controlador de autenticación por token (Sanctum).
 */
class AuthControlador extends Controller
{
    use ApiRespuesta;

    /**
     * Registro de usuario.
     */
    public function registro(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'max:255', Password::min(8)->letters()->numbers()],
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        return $this->ok([
            'usuario' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
        ], 'Usuario registrado correctamente.', 201);
    }

    /**
     * Login: devuelve token.
     */
    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
            'device_name' => ['nullable', 'string', 'max:255'],
        ]);

        $user = User::where('email', $data['email'])->first();

        // Verificación en tiempo constante: si el usuario no existe, igual se
        // ejecuta un hash dummy para no filtrar su existencia por el timing.
        $hash = $user?->password ?? '$2y$12$chS6dymavJCuHOXwYBpRcukBU/iUiE0ByUr2UxxIaNU/QUevGYwCK';

        if (! Hash::check($data['password'], $hash) || ! $user) {
            throw ValidationException::withMessages([
                'email' => ['Credenciales inválidas.'],
            ]);
        }

        $tokenName = $data['device_name'] ?? 'token-web';
        $token = $user->createToken($tokenName)->plainTextToken;

        return $this->ok([
            'token' => $token,
            'usuario' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
        ], 'Login exitoso.');
    }

    /**
     * Logout: revoca token actual.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return $this->ok(null, 'Sesión cerrada correctamente.');
    }
}
