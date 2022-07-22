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
    public function get(Request $request = null, int $paginate = 15): \Illuminate\Support\Collection|\Illuminate\Pagination\LengthAwarePaginator
    {
        $resources = Resource::with('resourceType')
            ->orderBy('created_at')
            ->when(
                $request->search ?? false,
                fn ($query) => $query->where('title', 'LIKE', "%$request->search%")
                    ->orWhere('description', 'LIKE', "%$request->search%")
            )
            ->when(
                $request->resource_type_id ?? false,
                fn ($query) => $query->whereIn('resource_type_id', $request->resource_type_id)
            );

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

    /**
     * Update the resource
     *
     * @param Request $request
     * @param Resource $resource
     * @return \App\Models\Resource
     */
    public function update(Request $request, Resource $resource): \App\Models\Resource
    {
        $resource->update(
            $request->only([
                'title',
                'description',
                'link',
                'html_snippet',
                'open_new_tab',
                'resource_type_id'
            ]));

        return $resource->refresh();
    }

    /**
     * Remove the resource
     *
     * @param Resource $resource
     * @return boolean
     */
    public function delete(Resource $resource): bool
    {
        return $resource->delete();
    }

    public function storePdf(File $pdf)
    {
    }
}
