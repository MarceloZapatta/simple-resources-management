<?php

namespace App\Http\Requests;

use App\Enums\ResourceTypeEnum;
use Illuminate\Foundation\Http\FormRequest;

class ResourceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'resource_type_id' => 'required|exists:resource_types,id',
            'title' => 'required|max:255',
            'description' => 'required_if:resource_type_id,' . ResourceTypeEnum::HTMLSnippet->value,
            'link' => 'required_if:resource_type_id,' . ResourceTypeEnum::Link->value . '|url',
            'html_snippet' => 'required_if:resource_type_id,' . ResourceTypeEnum::HTMLSnippet->value,
            'open_new_tab' => 'required_if:resource_type_id,' . ResourceTypeEnum::Link ->value. '|boolean'
        ];
    }
}
