<?php

namespace App\Services;

use App\Models\Producto;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

/**
 * Capa de servicio para encapsular lógica de negocio / consultas de Productos.
 */
class ProductoServicio
{
    /**
     * Listado paginado con búsqueda simple.
     */
    public function listar(Request $request): LengthAwarePaginator
    {
        $q = trim((string) $request->query('q', ''));
        $perPage = (int) $request->query('per_page', 10);
        $perPage = max(1, min($perPage, 100));

        $query = Producto::query()->orderByDesc('id');

        if ($q !== '') {
            $query->where('nombre', 'like', "%{$q}%");
        }

        return $query->paginate($perPage)->appends($request->query());
    }

    /**
     * Crear producto.
     */
    public function crear(array $data, ?int $usuarioId): Producto
    {
        $data['creado_por'] = $usuarioId;
        $data['actualizado_por'] = $usuarioId;

        return Producto::create($data);
    }

    /**
     * Actualizar producto.
     */
    public function actualizar(Producto $producto, array $data, ?int $usuarioId): Producto
    {
        $data['actualizado_por'] = $usuarioId;
        $producto->fill($data);
        $producto->save();

        return $producto->refresh();
    }

    /**
     * Eliminar (soft delete).
     */
    public function eliminar(Producto $producto, ?int $usuarioId): void
    {
        $producto->eliminado_por = $usuarioId;
        $producto->save();
        $producto->delete();
    }
}
