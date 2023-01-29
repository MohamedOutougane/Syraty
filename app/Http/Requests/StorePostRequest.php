<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // return false; // turn false to stop the user from creating a post
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            // regles de validation de formulaire
            'title' => 'required|unique:posts,title|max:130',
            'body' => 'required|min:5',
            'public' => 'nullable',
            'image' => 'mimes:jpeg,png,jpg,gif,svg|max:2048',
            'rating_id' => 'required',
        ];
    }
}
