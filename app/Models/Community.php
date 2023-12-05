<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Community extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'community_photo',
    ];
    
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class)->withTimestamps();
    }
    
    public function users(){
        return $this->belongsToMany(User::class, 'community_members')->withTimestamps();
    }
}


