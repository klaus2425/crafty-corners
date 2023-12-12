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
            'community_id' => $this->community_id,
            'user_id' => $this->user_id,
            'title' => $this->title,
            'content' => $this->content,
            'article_photo' => $this->article_photo,
            'link' => $this->link,
            'description' => $this->description,
            'author' => $this->author,
            'created_at' => $this->created_at->format('d-m-Y'),
            'updated_at' => $this->updated_at->diffForHumans(),
        ];
    }
}
