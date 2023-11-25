<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
class UpdateProfile extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
