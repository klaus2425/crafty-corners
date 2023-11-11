<?php

namespace App\Http\Controllers\api;
use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request){
        $user = User::create([
            'email' => $request->email,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'middle_name' => $request->middle_name,
            'user_name' => $request->user_name,
            'birthday' => $request->birthday,
            'street_address' => $request->street_address,
            'municipality' => $request->municipality,
            'province' => $request->province,
            'password' => bcrypt($request->password),
        ]);
        $token = $user->createToken('UserToken')->plainTextToken;
        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }
    public function login(LoginRequest $request){
        $credentials = $request->validated();
        if(!Auth::attempt($credentials)){
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);

        }
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('UserToken')->plainTextToken;
        return response()->json([
            'user' => $user,
            'token' => $token
        ]);

    }
    public function logout(Request $request){
        auth()->user()->tokens()->delete();
        return response()->json([
            'message' => 'Logged out'
        ]);
    }
}
