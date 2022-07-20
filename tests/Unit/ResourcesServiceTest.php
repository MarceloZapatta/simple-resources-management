<?php

namespace Tests\Unit;

use App\Enums\ResourceTypeEnum;
use App\Models\Resource;
use App\Services\ResourcesService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Tests\TestCase;

class ResourcesServiceTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test get resources
     *
     * @return void
     */
    public function test_get_resources()
    {
        Resource::factory(5)->create();

        /**
         * @var \App\Services\ResourcesService
         */
        $resourcesService = App::make(ResourcesService::class);

        $resources = $resourcesService->get();
        
        $this->assertCount(5, $resources);
        
        Resource::factory(3)->create();

        $resources = $resourcesService->get();

        $this->assertCount(8, $resources);
    }

    /**
     * Test store a resource
     *
     * @return void
     */
    public function test_store_resource()
    {
        /**
         * @var \App\Services\ResourcesService
         */
        $resourcesService = App::make(ResourcesService::class);

        $request = new Request([
            'title' => 'Sample Resource',
            'description' => 'Sample Description',
            'html_snippet' => '<p>Dev is <b>awesome</b>!</p>',
            'resource_type_id' => ResourceTypeEnum::HTMLSnippet
        ]);

        $result = $resourcesService->store($request);

        $this->assertCount(1, Resource::get());
        $this->assertInstanceOf(Resource::class, $result);
    }

    /**
     * Search resources
     *
     * @return void
     */ 
    public function test_search_resources()
    {
        Resource::factory()->create([
            'title' => 'Lorem ipsum dors met'
        ]);

        /**
         * @var \App\Services\ResourcesService
         */
        $resourcesService = App::make(ResourcesService::class);        

        $request = new Request([
            'search' => 'ipsum'
        ]);

        $resources = $resourcesService->get($request);

        $this->assertCount(1, $resources);

        $request = new Request([
            'search' => 'blabla'
        ]);

        $resources = $resourcesService->get($request);

        $this->assertEmpty($resources);
    }
}
