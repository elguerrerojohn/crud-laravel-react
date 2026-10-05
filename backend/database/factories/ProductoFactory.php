<?php

namespace Database\Factories;

use App\Models\Producto;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * Factory para productos.
 */
class ProductoFactory extends Factory
{
    protected $model = Producto::class;

    public function definition(): array
    {
        return [
            'nombre' => 'Producto ' . fake()->unique()->word(),
            'descripcion' => fake()->sentence(10),
            'precio' => fake()->randomFloat(2, 1, 500),
            'cantidad' => fake()->numberBetween(0, 200),
        ];
    }
}
