<?php

namespace App\Http\Requests\Producto;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Validación para actualizar productos.
 */
class ActualizarProductoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'nombre' => ['sometimes', 'required', 'string', 'min:2', 'max:255'],
            'descripcion' => ['sometimes', 'nullable', 'string', 'max:5000'],
            'precio' => ['sometimes', 'required', 'numeric', 'gt:0', 'max:99999999.99', 'decimal:0,2'],
            'cantidad' => ['sometimes', 'required', 'integer', 'min:0', 'max:4294967295'],
        ];
    }
}
