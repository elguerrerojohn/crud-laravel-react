<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;

/**
 * Controlador base.
 */
abstract class Controller
{
    use AuthorizesRequests, ValidatesRequests;
}
