<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'community_id', 'content', 'image', 'video', 'link', 'likes', 'shares', 'comments'];

    public function community()
    {
        return $this->belongsTo(Community::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function getPhotoUrlAttribute()
    {
        return $this->image ? asset('storage/posts/' . $this->image) : null;
    }
}
