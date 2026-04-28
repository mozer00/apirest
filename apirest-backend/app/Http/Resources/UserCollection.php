<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Cache;

class UserCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        //return parent::toArray($request);
        $totalUsers = Cache::remember('users_total', now()->addMinutes(10), fn() => User::count());


        return[
            'data' => $this->collection,
            'infos' => [
                'total_users' => $totalUsers
            ],
        ];
    }
}
