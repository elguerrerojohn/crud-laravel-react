<?php
// Laravel 11 ya no requiere Http Kernel separado por defecto.
// Se incluye por compatibilidad si tu entorno lo necesita.
namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    //
}
