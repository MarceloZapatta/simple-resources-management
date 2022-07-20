<?php

namespace App\Services;

use App\Enums\ResourceTypeEnum;
use App\Models\Resource;
use Illuminate\Http\File;
use Illuminate\Http\Request;

class ResourcesService
{
    /**
     * Get the resource
     *
     * @return \Illuminate\Support\Collection
     */
    public function get(): \Illuminate\Support\Collection
    {
        return Resource::orderBy('created_at')->get();
    }

    /**
     * Store a new Resource
     *
     * @param ResourceStoreRequest $request
     * @return \App\Models\Resource
     */
    public function store(Request $request): \App\Models\Resource
    {
        if ($request->resource_type_id === ResourceTypeEnum::PDF) {
            $request->merge([
                'link' => $this->storePdf($request->file)
            ]);
        }

        return Resource::create(
            $request->only([
                'title',
                'description',
                'link',
                'html_snippet',
                'open_new_tab',
                'resource_type_id'
            ])
        );
    }

    public function storePdf(File $pdf)
    {
    }
}
