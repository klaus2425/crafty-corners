<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('middle_name')->nullable();
            $table->string('user_name')->unique();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('birthday')->nullable();
            $table->string('street_address')->nullable();
            $table->string('municipality')->nullable();
            $table->string('province')->nullable();
            $table -> string('phone_number') -> nullable();
            $table ->string('gender') -> nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('profile_picture')->nullable();
            $table->string('type')->default('hobbyist');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
