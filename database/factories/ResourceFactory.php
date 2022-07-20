<?php

namespace Database\Factories;

use App\Enums\ResourceTypeEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Resource>
 */
class ResourceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => ucfirst($this->faker->word()),
            'description' => $this->faker->text(),
            'html_snippet' => $this->faker->randomHtml(),
            'link' => $this->faker->url(),
            'resource_type_id' => ResourceTypeEnum::HTMLSnippet
        ];
    }
}
