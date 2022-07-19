<?php

use App\Models\ResourceType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('resource_types', function (Blueprint $table) {
            $table->id();
            $table->string('type');
        });

        ResourceType::insert([
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
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('resource_types');
    }
};
