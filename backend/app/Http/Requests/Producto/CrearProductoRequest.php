<?php

namespace App\Http\Requests\Producto;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Validación para crear productos.
 */
class CrearProductoRequest extends FormRequest
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
            'nombre' => ['required', 'string', 'min:2', 'max:255'],
            'descripcion' => ['nullable', 'string', 'max:5000'],
            'precio' => ['required', 'numeric', 'gt:0', 'max:99999999.99', 'decimal:0,2'],
            'cantidad' => ['required', 'integer', 'min:0', 'max:4294967295'],
        ];
    }
}
