<?php

namespace App\Http\Requests\Article;

use Illuminate\Foundation\Http\FormRequest;

class StoreArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'community_id' => 'required|exists:communities,id',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'article_photo' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'link' => 'string|max:255',
            'description' => 'string|max:255',
            'author' => 'string|max:255',
        ];
    }
}
