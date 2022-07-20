<?php

namespace Tests\Unit\Api;

use App\Models\Resource;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ResourceControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Testing get resources
     *
     * @return void
     */
    public function test_get_resources()
    {
        Resource::factory(5)->create();        
        
        $this->get(route('api.resources.index'))
            ->assertStatus(200)
            ->assertJsonCount(5, 'data');
    }
}
