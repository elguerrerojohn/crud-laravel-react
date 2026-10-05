<?php

namespace Tests\Feature;

use App\Models\Producto;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductoTest extends TestCase
{
    use RefreshDatabase;

    private function authHeaderFor(User $user): array
    {
        $token = $user->createToken('phpunit')->plainTextToken;

        return ['Authorization' => 'Bearer ' . $token];
    }

    private function authHeader(): array
    {
        return $this->authHeaderFor(User::factory()->create());
    }

    public function test_rechaza_acceso_no_autenticado(): void
    {
        $this->getJson('/api/v1/productos')->assertStatus(401);
    }

    public function test_listado_productos_paginado(): void
    {
        Producto::factory()->count(15)->create();

        $response = $this->withHeaders($this->authHeader())
            ->getJson('/api/v1/productos?per_page=10');

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonStructure([
                'success',
                'message',
                'data',
                'links',
                'meta',
            ]);
    }

    public function test_crear_producto_validacion_precio(): void
    {
        $payload = [
            'nombre' => 'Bolsa',
            'descripcion' => 'Prueba',
            'precio' => 0,
            'cantidad' => 1,
        ];

        $response = $this->withHeaders($this->authHeader())
            ->postJson('/api/v1/productos', $payload);

        $response->assertStatus(422);
    }

    public function test_crear_producto_ok(): void
    {
        $payload = [
            'nombre' => 'Bolsa transparente',
            'descripcion' => 'Producto de prueba',
            'precio' => 12.50,
            'cantidad' => 10,
        ];

        $response = $this->withHeaders($this->authHeader())
            ->postJson('/api/v1/productos', $payload);

        $response->assertStatus(201)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.nombre', 'Bolsa transparente');
    }

    public function test_el_dueno_puede_eliminar_su_producto(): void
    {
        $user = User::factory()->create();
        $producto = Producto::factory()->create(['creado_por' => $user->id]);

        $response = $this->withHeaders($this->authHeaderFor($user))
            ->deleteJson('/api/v1/productos/' . $producto->id);

        $response->assertStatus(200)->assertJsonPath('success', true);
        $this->assertSoftDeleted('productos', ['id' => $producto->id]);
    }

    public function test_un_usuario_no_puede_eliminar_producto_ajeno(): void
    {
        $dueno = User::factory()->create();
        $otro = User::factory()->create();
        $producto = Producto::factory()->create(['creado_por' => $dueno->id]);

        $response = $this->withHeaders($this->authHeaderFor($otro))
            ->deleteJson('/api/v1/productos/' . $producto->id);

        $response->assertStatus(403);
        $this->assertDatabaseHas('productos', ['id' => $producto->id, 'deleted_at' => null]);
    }

    public function test_un_usuario_no_puede_actualizar_producto_ajeno(): void
    {
        $dueno = User::factory()->create();
        $otro = User::factory()->create();
        $producto = Producto::factory()->create(['creado_por' => $dueno->id]);

        $response = $this->withHeaders($this->authHeaderFor($otro))
            ->putJson('/api/v1/productos/' . $producto->id, ['nombre' => 'Hackeado']);

        $response->assertStatus(403);
    }
}
