<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'middle_name' =>$this->middle_name,
            'last_name' => $this->last_name,
            'user_name' => $this->user_name,
            'email' => $this->email,
            'birthday' => $this->birthday,
            'street_address' => $this->street_address,
            'municipality' => $this->municipality,
            'province' => $this->province,
            'profile_picture' => $this->profile_picture,
            'type' => $this->type,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

        ];
    }
}
