<?php

namespace App\Services;

use App\Enums\ResourceTypeEnum;
use App\Models\Resource;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
        $filePath = false;

        $resourceTypeId = (int) $request->resource_type_id;
        $resourceTypePDF = ResourceTypeEnum::PDF->value;
        if ($resourceTypeId === $resourceTypePDF) {
            $filePath = $this->storePdf($request->file('file'));
        }

        return Resource::create([
            'title' => $request->title,
            'description' => $request->description,
            'link' => $request->link,
            'file' => $filePath ? $filePath : null,
            'html_snippet' => $request->html_snippet,
            'open_new_tab' => $request->open_new_tab ?? 0,
            'resource_type_id' => $request->resource_type_id
        ]);
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
            ])
        );

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

    /**
     * Store the pdf in public folder
     *
     * @param \Illuminate\Http\UploadedFile $pdf
     * @return string
     */
    public function storePdf(\Illuminate\Http\UploadedFile $pdf): string
    {
        return $pdf->store('public/pdfs');
    }
}
