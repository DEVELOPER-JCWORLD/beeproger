<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TodoListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        Return [
            'id' => $this->id,
            'TodoList-title' => $this->title,
            'TodoList-description' => $this->description,
            'TodoList-image' => $this->image,
            'isTodo-completed' => $this->completed
        ];
    }
}
