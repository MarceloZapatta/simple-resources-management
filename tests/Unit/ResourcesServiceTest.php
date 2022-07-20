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
     * A basic unit test example.
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

        $this->assertCount(1, Resource::get())
            ->assertInstanceOf(Resource::class, $result);
    }
}
