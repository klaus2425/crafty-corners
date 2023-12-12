<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return[
           
            'title' => $this->title,
            'content' => $this->content,
            'article_photo' => $this->article_photo,
            'link' => $this->link,
            'description' => $this->description,
            'author' => $this->author,
            'created_at' => $this->created_at->format('d-m-Y'),
            'updated_at' => $this->updated_at->diffForHumans(),
            'community'=>[
                'id' => $this->community->id,
                'name' => $this->community->name,
            ],
            'user'=>[
                'id' => $this->user->id,
                'first_name' => $this->user->first_name,
                'last_name' => $this->user->last_name,
            ]
        ];
    }
}
