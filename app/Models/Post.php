<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    // protected $with = ['user:id,first_name,last_name,middle_name,user_name,profile_picture', 'community:id,name,community_photo', 'comments.user:id'];

    protected $fillable = ['user_id', 'community_id','title' ,'content', 'image', 'video', 'link', 'likes', 'shares', 'comments'];

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

    public function postLikes()
    {
        return $this->belongsToMany(User::class, 'post_likes')->withTimestamps();
    }

    public function postShares()
    {
        return $this->hasMany(PostShare::class);
    }

    public function getPhotoUrlAttribute()
    {
        return $this->image ? asset('storage/posts/' . $this->image) : null;
    }
}