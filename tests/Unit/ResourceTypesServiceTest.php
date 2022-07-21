<?php

namespace Tests\Unit;

use App\Services\ResourceTypesService;
use Illuminate\Support\Facades\App;
use Tests\TestCase;

class ResourceTypesServiceTest extends TestCase
{
    /**
     * Test get resource types
     *
     * @return void
     */
    public function test_get_resource_types()
    {
        /**
         * @var \App\Services\ResourceTypesService
         */
        $resourceTypesService = App::make(ResourceTypesService::class);

        $resourceTypes = $resourceTypesService->get();

        $this->assertCount(3, $resourceTypes);
    }
}
