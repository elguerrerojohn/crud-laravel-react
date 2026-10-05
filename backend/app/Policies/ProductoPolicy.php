<?php

namespace App\Policies;

use App\Models\Producto;
use App\Models\User;

/**
 * Política de autorización de Productos.
 *
 * Regla: el listado y la vista están disponibles para cualquier usuario
 * autenticado (catálogo compartido), pero modificar o eliminar un producto
 * queda restringido a su creador (propiedad a nivel de objeto).
 */
class ProductoPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Producto $producto): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Producto $producto): bool
    {
        return $producto->creado_por !== null
            && (int) $producto->creado_por === (int) $user->id;
    }

    public function delete(User $user, Producto $producto): bool
    {
        return $this->update($user, $producto);
    }
}
