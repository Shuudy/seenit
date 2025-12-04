<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SuccessResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'status' => 'success',
            'message' => $this['message'],
            'data' => $this['data'] ?? null,
            'meta' => $this['meta'] ?? null,
        ];
    }

    /**
     * Customize the response for the resource.
     */
    public function withResponse($request, $response)
    {
        $response->setStatusCode($this['status_code'] ?? 200);
    }
}
