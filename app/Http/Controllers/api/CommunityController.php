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
        $community = Community::create($request->validated());
        return new CommunityResource($community);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $community = Community::findOrFail($id);
        return new CommunityResource($community);
    }


    public function update(CommunityRequest $request, string $id)
    {
        $community = Community::findOrFail($id);
        $community->update($request->validated());
        return new CommunityResource($community);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $community = Community::findOrFail($id);
        $community->delete();
        return response()->json([
            'message' => 'Community deleted successfully'
        ]);
    }
}
