<?php

namespace Database\Seeders;

use App\Models\Producto;
use App\Models\User;
use Illuminate\Database\Seeder;

/**
 * Seeder de productos de prueba.
 */
class ProductoSeeder extends Seeder
{
    public function run(): void
    {
        // Asigna el admin como creador para que los productos de demo
        // queden bajo una propiedad real (coherente con ProductoPolicy).
        $adminId = User::where('email', env('SEED_ADMIN_EMAIL', 'admin@demo.com'))->value('id');

        Producto::factory()->count(25)->create([
            'creado_por' => $adminId,
            'actualizado_por' => $adminId,
        ]);
    }
}
