<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Producto\ActualizarProductoRequest;
use App\Http\Requests\Producto\CrearProductoRequest;
use App\Http\Resources\ProductoRecurso;
use App\Models\Producto;
use App\Services\ProductoServicio;
use Illuminate\Http\Request;

/**
 * Controlador CRUD de Productos.
 */
class ProductoControlador extends Controller
{
    /**
     * @var ProductoServicio
     */
    private ProductoServicio $servicio;

    public function __construct(ProductoServicio $servicio)
    {
        $this->servicio = $servicio;
    }

    /**
     * Listado paginado + búsqueda.
     */
    public function index(Request $request)
    {
        $paginator = $this->servicio->listar($request);

        return ProductoRecurso::collection($paginator)->additional([
            'success' => true,
            'message' => 'Listado de productos.',
        ]);
    }

    /**
     * Crear producto.
     */
    public function store(CrearProductoRequest $request)
    {
        $producto = $this->servicio->crear(
            $request->validated(),
            $request->user()?->id
        );

        return (new ProductoRecurso($producto))->additional([
            'success' => true,
            'message' => 'Producto creado correctamente.',
        ])->response()->setStatusCode(201);
    }

    /**
     * Ver detalle.
     */
    public function show(Producto $producto)
    {
        return (new ProductoRecurso($producto))->additional([
            'success' => true,
            'message' => 'Detalle del producto.',
        ]);
    }

    /**
     * Actualizar producto.
     */
    public function update(ActualizarProductoRequest $request, Producto $producto)
    {
        $this->authorize('update', $producto);

        $producto = $this->servicio->actualizar(
            $producto,
            $request->validated(),
            $request->user()?->id
        );

        return (new ProductoRecurso($producto))->additional([
            'success' => true,
            'message' => 'Producto actualizado correctamente.',
        ]);
    }

    /**
     * Eliminar (soft delete).
     */
    public function destroy(Request $request, Producto $producto)
    {
        $this->authorize('delete', $producto);

        $this->servicio->eliminar($producto, $request->user()?->id);

        return response()->json([
            'success' => true,
            'message' => 'Producto eliminado correctamente.',
            'data' => null,
        ]);
    }
}
