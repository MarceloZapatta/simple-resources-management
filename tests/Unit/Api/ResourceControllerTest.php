<?php

namespace Tests\Unit\Api;

use App\Enums\ResourceTypeEnum;
use App\Models\Resource;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
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

    /**
     * Tests show resource
     *
     * @return void
     */
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
                    'file' => null,
                    'html_snippet' => $resource->html_snippet,
                    'open_new_tab' => $resource->open_new_tab ? 1 : 0,
                    'resource_type' => $resource->resourceType
                ]
            ]);

        $this->get(route('api.resources.show', ['resource' => 1231231]))
            ->assertStatus(404);
    }

    /**
     * Test store resource
     *
     * @return void
     */
    public function test_store_resource()
    {
        $this->withHeaders([
            'Accept' => 'application/json'
        ])->post(route('api.resources.store'))
            ->assertStatus(422)
            ->assertJsonValidationErrors(['resource_type_id']);

        $this->withHeaders([
            'Accept' => 'application/json',
            'Content-Type' => 'multipart/form-data'
        ])->post(route('api.resources.store'), [
            'resource_type_id' => ResourceTypeEnum::PDF->value,
            'title' => 'Test',
            'file' => UploadedFile::fake()->create('test.pdf', 1000, 'application/pdf')
        ])
            ->assertStatus(201);

        $this->assertModelExists(Resource::whereTitle('Test')
            ->whereResourceTypeId(ResourceTypeEnum::PDF->value)
            ->first());

        $this->withHeaders([
            'Accept' => 'application/json'
        ])->post(route('api.resources.store'), [
            'resource_type_id' => ResourceTypeEnum::PDF->value,
        ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['title']);

        $this->withHeaders([
            'Accept' => 'application/json'
        ])->post(route('api.resources.store'), [
            'resource_type_id' => ResourceTypeEnum::HTMLSnippet->value,
            'title' => 'Test',
            'description' => 'Lorem ipsum dors met',
            'html_snippet' => '<b>test</b>'
        ])
            ->assertStatus(201);

        $this->assertModelExists(Resource::whereTitle('Test')
            ->whereDescription('Lorem ipsum dors met')
            ->whereHtmlSnippet('<b>test</b>')
            ->whereResourceTypeId(ResourceTypeEnum::HTMLSnippet->value)
            ->first());

        $this->withHeaders([
            'Accept' => 'application/json'
        ])->post(route('api.resources.store'), [
            'resource_type_id' => ResourceTypeEnum::HTMLSnippet->value
        ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['title', 'html_snippet', 'description']);

        $this->withHeaders([
            'Accept' => 'application/json'
        ])->post(route('api.resources.store'), [
            'resource_type_id' => ResourceTypeEnum::Link->value,
            'title' => 'Test',
            'link' => 'https://www.remotecompany.com/',
            'open_new_tab' => 0
        ])
            ->assertStatus(201);

        $this->assertModelExists(Resource::whereTitle('Test')
            ->whereLink('https://www.remotecompany.com/')
            ->whereResourceTypeId(ResourceTypeEnum::Link->value)
            ->first());

        $this->withHeaders([
            'Accept' => 'application/json'
        ])->post(route('api.resources.store'), [
            'resource_type_id' => ResourceTypeEnum::Link->value,
            'title' => 'Test',
            'link' => 'https://www.remotecompany.com/',
        ])
            ->assertStatus(422);

        $this->withHeaders([
            'Accept' => 'application/json'
        ])->post(route('api.resources.store'), [
            'resource_type_id' => ResourceTypeEnum::Link->value
        ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['title', 'link', 'open_new_tab']);
    }
}
