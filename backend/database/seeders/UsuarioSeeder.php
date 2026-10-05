<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * Crea el usuario administrador inicial.
 *
 * En local/testing usa una contraseña fija de demo. En cualquier otro
 * entorno exige SEED_ADMIN_PASSWORD; si no está definida, genera una
 * aleatoria y la informa por consola (nunca credenciales fijas en prod).
 */
class UsuarioSeeder extends Seeder
{
    public function run(): void
    {
        $esLocal = app()->environment('local', 'testing');

        $password = $esLocal
            ? 'password'
            : (env('SEED_ADMIN_PASSWORD') ?: Str::password(16));

        $user = User::updateOrCreate(
            ['email' => env('SEED_ADMIN_EMAIL', 'admin@demo.com')],
            [
                'name' => 'Administrador',
                'password' => Hash::make($password),
            ]
        );

        if (! $esLocal && ! env('SEED_ADMIN_PASSWORD')) {
            $this->command?->warn("Admin creado ({$user->email}). Contraseña generada: {$password}");
        }
    }
}
