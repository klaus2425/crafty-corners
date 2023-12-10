<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Schedule;
use App\Models\Post;
use App\Models\Community;
use App\Models\Comment;
use App\Models\PostLike;
use App\Models\PostShare;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'first_name',
        'last_name',
        'middle_name',
        'user_name',
        'street_address',
        'municipality',
        'province',
        'password',
        'profile_picture',
        'birthday',
        'type',
        'gender',
        'phone_number',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'birthday' => 'date:Y-m-d',
    ];

    public function schedule()
    {
        return $this->hasMany(Schedule::class);
    }

    public function setBirthdayAttribute($value)
    {
        $this->attributes['birthday'] = date('Y-m-d', strtotime($value));
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function communities()
    {
        return $this->belongsToMany(Community::class)->withTimestamps();
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    // public function postLikes()
    // {
    //     return $this->belongsToMany(Post::class, 'post_likes')->withTimestamps();
    // }
    
    // public function postShares()
    // {
    //     return $this->hasMany(Post::class);
    // }
    


}
