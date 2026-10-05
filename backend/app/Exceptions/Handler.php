<?php
// Laravel 11 permite configurar excepciones en bootstrap/app.php.
// Se incluye por compatibilidad si tu entorno lo necesita.
namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    public function register(): void
    {
        //
    }
}
