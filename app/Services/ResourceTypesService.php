<?php

namespace App\Services;

use App\Models\ResourceType;

class ResourceTypesService
{
    /**
     * Get resource types
     *
     * @return \Illuminate\Support\Collection
     */
    public function get(): \Illuminate\Support\Collection
    {
        return ResourceType::orderBy('id')->get();
    }
}
