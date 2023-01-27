<?php

use App\Models\User;
use App\Models\Rating;
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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title', 100);
            $table->text('body', 2500)->nullable()->default(null);
            $table->string('slug')->unique();
            $table->string('image')->nullable();
            $table->boolean('public')->default(false);
            $table->timestamps();

            $table->foreignIdFor(User::class);
            $table->foreignIdFor(Rating::class);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
};
