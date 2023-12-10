<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Community;
use App\Http\Resources\CommunityResource;
use App\Http\Requests\Community\StoreCommunityRequest;
use App\Http\Requests\Community\UpdateCommunityRequest;

class CommunityController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $communities = Community::all();
        return CommunityResource::collection($communities);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommunityRequest $request) {
        if(auth()->user()->type != 'admin') {
            return response()->json([
                'message' => 'You are not authorized to create a community'
            ], 403);
        }
        $community = $request->validated();
        $community['user_id'] = auth()->user()->id;
        $community = Community::create($community);

        if($request->hasFile('community_photo')) {
            $file = $request->file('community_photo');
            $fileName = $community->id.'.'.$file->getClientOriginalExtension();
            $file->storeAs('public/communities', $fileName);
            $community->community_photo = $fileName;
            $community->save();
        }

        return new CommunityResource($community);

    }

    /**
     * Display the specified resource.
     */
    public function show(Community $community) {
        return new CommunityResource($community);
    }
    
    public function update(UpdateCommunityRequest $request, Community $community) {

        if(auth()->user()->type != 'admin') {
            return response()->json([
                'message' => 'You are not authorized to update this community'
            ], 403);
        }
        $data = $request->validated();
        if($request->hasFile('community_photo')) {
            $file = $request->file('community_photo');
            $fileName = $community->id.'.'.$file->getClientOriginalExtension();
            $file->storeAs('public/communities', $fileName);
            $data['community_photo'] = $fileName;
        }
        $community->update($data);
        return new CommunityResource($community);
    }
    public function destroy(Community $community){
        if(auth()->user()->id != $community->user_id) {
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
