<?php

namespace Tests\Unit;

use Tests\TestCase;

class ResourceTypesControllerTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_returning_resources_types()
    {
        $this->get(route('api.resource-types.index'))
            ->assertStatus(200)
            ->assertExactJson([
                'data' => [
                    [
                        'id' => 1,
                        'type' => 'PDF'
                    ],
                    [
                        'id' => 2,
                        'type' => 'HTML snippet'
                    ],
                    [
                        'id' => 3,
                        'type' => 'Link'
                    ],
                ]
            ]);
    }
}
