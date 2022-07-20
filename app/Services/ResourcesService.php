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
     * @param integer $paginate
     * @return \Illuminate\Support\Collection|\Illuminate\Pagination\LengthAwarePaginator
     */
    public function get(int $paginate = 15): \Illuminate\Support\Collection|\Illuminate\Pagination\LengthAwarePaginator
    {
        $resources =  Resource::with('resourceType')
            ->orderBy('created_at');

        return $paginate ? $resources->paginate($paginate) : $resources->get();
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
