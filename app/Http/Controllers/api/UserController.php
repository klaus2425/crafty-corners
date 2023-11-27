<?php

// UserController.php
namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Log;

class UserController extends Controller



{
    public function index()
    {
        $users = User::all();
        return UserResource::collection($users);
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

    public function update(UserRequest $request, User $user)
    {
        // Validate the request
        $data = $request->validated();

        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');
            $file->move(public_path() . '/storage/users/', $file->getClientOriginalName());
            $data['profile_picture'] = $file->getClientOriginalName();
        }
        //
        // if ($request->hasFile('profile_picture')) {
        //     $profile_picture = $request->file('profile_picture');
        //     $path = $profile_picture->store('users', 'public');
        //     $data['profile_picture'] = $path;
        // }
        $user->update($data);

        return new UserResource($user);
    }
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([
            'message' => 'User deleted successfully'
        ]);
    }
}

