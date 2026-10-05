<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Resource de Producto: define la salida pública del modelo.
 */
class ProductoRecurso extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'descripcion' => $this->descripcion,
            'precio' => (string) $this->precio,
            'cantidad' => (int) $this->cantidad,
            'creado_en' => optional($this->created_at)->toISOString(),
            'actualizado_en' => optional($this->updated_at)->toISOString(),
        ];
    }
}
