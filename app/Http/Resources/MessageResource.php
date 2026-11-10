<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'      => $this->id,
            'content' => $this->content,
            'created_at' => $this->created_at->format('g:ia'), // format('g:ia')は日時を 「時:分am/pm」 の形で表示する指定
            'user' => UserResource::make($this->user)
        ];
    }
}
