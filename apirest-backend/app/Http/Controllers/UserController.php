<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Exception;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $currentPage = $request->get('current_page') ?? 1;
        // $regsPerPage = 3;
        // $skip = ($currentPage -1) * $regsPerPage;
        // $users = User::skip($skip)->take($regsPerPage)->orderByDesc('id')->get();

        $users = User::orderByDesc('id')->paginate(10);
        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = ($request->validated());

        try {
            $user = new User();
            $user->fill($data);
            $user->password = Str::random(12);
            $user->save();

            return response()->json($user->toResource(), 201);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao criar usuário!'
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $user = User::findOrFail($id);        
            return response()->json($user->toResource(), 200);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao buscar usuário!'
            ], 404);
        }
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, string $id)
    {
        $data = $request->validated();

        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuário não encontrado!'], 404);
        }

        try {
            $user->update($data);

            return response()->json($user->toResource(), 200);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao alterar usuário!'
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $removed = User::destroy($id);
            if(!$removed){
                throw new Exception();
            }
            
            return response()->json(null, 204);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Falha ao remover usuário!'
            ], 400);
        }
    }
}
