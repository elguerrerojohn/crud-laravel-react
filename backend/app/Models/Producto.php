<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Modelo Producto.
 */
class Producto extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * @var string
     */
    protected $table = 'productos';

    /**
     * @var array<int, string>
     */
    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'cantidad',
        'creado_por',
        'actualizado_por',
        'eliminado_por',
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'precio' => 'decimal:2',
        'cantidad' => 'integer',
    ];
}
