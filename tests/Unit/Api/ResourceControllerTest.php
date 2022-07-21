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

    public function test_show_resource()
    {
        $resource = Resource::factory()->create();

        $this->get(route('api.resources.show', ['resource' => $resource->id]))
            ->assertStatus(200)
            ->assertExactJson([
                'data' => [
                    'id' => $resource->id,
                    'title' => $resource->title,
                    'description' => $resource->description,
                    'link' => $resource->link,
                    'html_snippet' => $resource->html_snippet,
                    'open_new_tab' => $resource->open_new_tab ? 1 : 0,
                    'resource_type' => $resource->resourceType
                ]
            ]);

        $this->get(route('api.resources.show', ['resource' => 1231231]))
            ->assertStatus(404);
    }
}
