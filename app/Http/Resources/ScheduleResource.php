<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'schedule_day' => $this->schedule_day,
            'schedule_name' => $this->schedule_name,
            'schedule_description' => $this->schedule_description,
            'schedule_color' => $this->schedule_color,
            'start_time' => $this->start_time->format('H:i'),
            'end_time' => $this->end_time->format('H:i'),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at->diffForHumans()
        ];
    }
}
