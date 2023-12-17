<?php

namespace App\Http\Controllers\Api;

use App\Models\Article;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Article\UpdateArticleRequest;
use App\Http\Requests\Article\StoreArticleRequest;
use App\Http\Resources\ArticleResource;
use App\Models\Community;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::all();
        return ArticleResource::collection($articles);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreArticleRequest $request)
    {
        $articleData = $request->validated();
        $articleData['user_id'] = auth()->user()->id;
        if(!auth()->user()->is_admin) {
            $articleData['author'] = auth()->user()->first_name . ' ' . auth()->user()->last_name;
        }
        
        if($request->hasFile('article_photo')) {
            $file = $request->file('article_photo');
            $fileName = auth()->user()->id.'.'.$file->getClientOriginalExtension();
            $file->storeAs('public/articles', $fileName);
            $articleData['article_photo'] = $fileName;
        }
        
        $article = auth()->user()->articles()->create($articleData);
        return new ArticleResource($article);
    }
    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArticleRequest $request, Article $article)
    {
      $data = $request->validated();
        if($request->hasFile('article_photo')) {
            $file = $request->file('article_photo');
            $fileName = auth()->user()->id.'.'.$file->getClientOriginalExtension();
            $file->storeAs('public/articles', $fileName);
            $data['article_photo'] = $fileName;}
        $article->update($data);

        return new ArticleResource($article);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $article->delete();
        return response()->json([
            'message' => 'Article deleted successfully'
        ]);
    }
}
