<?php

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
        Schema::create('resources', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description')->nullable()->default(NULL);
            $table->text('html_snippet')->nullable()->default(NULL);
            $table->string('file')->nullable()->default(NULL);
            $table->string('link')->nullable()->default(NULL);
            $table->boolean('open_new_tab')->default(false);
            $table->foreignId('resource_type_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('resources');
    }
};
