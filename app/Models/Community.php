<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Community extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'community_photo'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
