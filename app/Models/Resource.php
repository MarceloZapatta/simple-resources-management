<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'html_snippet',
        'link',
        'open_new_tab',
        'resource_type_id',
        'file'
    ];

    public function resourceType()
    {
        return $this->belongsTo(ResourceType::class);
    }
}
