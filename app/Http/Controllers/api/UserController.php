<?php

// UserController.php
namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller



{
    public function index()
    {
        $users = User::all();
        return UserResource::collection($users);
    }

    public function show(User $user)
    {
        // $user->load('posts', 'communities', 'comments');
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

        if($request->has('posts')){
            $user->posts()->sync($data['posts']);
        }
        if($request->has('communities')){
            $user->communities()->sync($data['communities']);
        }
        if($request->has('comments')){
            $user->comments()->sync($data['comments']);
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
        if($user->profile_picture){
            Storage::delete('/public/users/' . $user->profile_picture);
        }

        $user->delete();
        return response()->json([
            'message' => 'User deleted successfully'
        ]);
    }
    
    public function joinCommunity(Request $request, $communityId)
    {
        $user = auth()->user();

        if($user->joinCommunity($communityId)){
            return response()->json([
                'message' => 'You have joined the community'
            ]);
        }

        else {
            return response()->json([
                'message' => 'You are already a member of this community'
            ], 400);
        }
    }
    public function joinCommunity(Request $request, $communityId)
    {
        $user = auth()->user();

        if($user->joinCommunity($communityId)){
            return response()->json([
                'message' => 'You have joined the community'
            ]);
        }

        else {
            return response()->json([
                'message' => 'You are already a member of this community'
            ], 400);
        }
    }
}

