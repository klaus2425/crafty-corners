<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Community;
use App\Http\Resources\CommunityResource;
use App\Http\Requests\CommunityRequest;


class CommunityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $communities = Community::all();
        return CommunityResource::collection($communities);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CommunityRequest $request)
    {
        if(auth()->user()->type != 'admin'){
            return response()->json([
                'message' => 'You are not authorized to create a community'
            ], 403);
        }
        $commmunity = $request->validated();
        $commmunity['user_id'] = auth()->user()->id;
        $community = Community::create($commmunity);

        if($request->hasFile('community_photo')){
            $file = $request->file('community_photo');
            $fileName = $community->id . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/communities', $fileName);
            $community->community_photo = $fileName;
            $community->save();
        }

       return new CommunityResource($community);


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       $community = Community::with('user')->findOrFail($id);
         return response()->json([
            'community' => $community,
            'posts' => $post
         ]);
    }


    public function update(CommunityRequest $request, string $id)
    {
        $community = Community::findOrFail($id);

        if(auth()->user()->id != $community->user_id){
            return response()->json([
                'message' => 'You are not authorized to update this community'
            ], 403);
        }

        if($request->hasFile('community_photo')){
            $file = $request->file('community_photo');
            $fileName = $community->id . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/communities', $fileName);
            $community->community_photo = $fileName;
            $community->save();
        }
        $validatedData = $request->validated();
        unset($validatedData['user_id']);

        $community->update($validatedData);

        return new CommunityResource($community);
    }
    public function destroy(string $id)
    {
        $community = Community::findOrFail($id);
        if(auth()->user()->id != $community->user_id){
            return response()->json([
                'message' => 'You are not authorized to delete this community'
            ], 403);
        }


        $community->delete();
        return response()->json([
            'message' => 'Community deleted successfully'
        ]);
    }
}
