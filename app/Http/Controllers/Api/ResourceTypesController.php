<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ResourceTypesService;
use App\Http\Resources\ResourceTypeCollection;

class ResourceTypesController extends Controller
{
    /**
     * Resource Types Service
     *
     * @var ResourceTypesService
     */
    private ResourceTypesService $resourceTypesService;

    /**
     * Resource Types Controller
     *
     * @param ResourceTypesService $resourceTypesService
     */
    public function __construct(ResourceTypesService $resourceTypesService)
    {
        $this->resourceTypesService = $resourceTypesService;
    }

    /**
     * Return resource types
     *
     * @return \App\Http\Resources\ResourceTypeCollection
     */
    public function index(): \App\Http\Resources\ResourceTypeCollection
    {
        return new ResourceTypeCollection($this->resourceTypesService->get());
    }
}
