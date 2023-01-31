<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Rating;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //Cette méthode de "PostController" récupère tous les articles de la base de données
        // $posts = Post::all();

        //Cette méthode récupère tous les articles de la base de données avec leur user
        // $posts = Post::with('user')->get()->all();

        //Cette méthode récupère tous les articles de la base de données avec leur user les tris par les pluys récents et les pagine de 7 en 7
        $posts = Post::with('user')->latest()->paginate(7);


        $newPost = new Post();
        $ratings = Rating::all();



        // et les envoie à la vue "posts.index" pour les afficher.
        return view('posts.index', compact('posts', 'newPost', 'ratings'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePostRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePostRequest $request)
    {

        // je récupère les données du formulaire
        $data = $request->all();

        // j'attribut une valeur provisoire à la variable $user_id 
        $user_id = 1;

        // je remplace les espaces par des tirets dans le titre
        $slug = str_replace(' ', '-', $data['title']);

        // je donne un nom à l'image avec le nom de l'utilisateur, le titre de l'article et le timestamp
        $imageName = $user_id . '_' . $slug . '_' . time() . '.' . $request->image->extension();
         
        // je déplace l'image dans le dossier "public/storage" du projet
        $request->image->move(public_path('storage'), $imageName);

        // définit la valeur de $public si la clé "public" existe dans $data à 1, sinon elle est définie à 0.
        $public = array_key_exists('public', $data) ? 1 : 0;

        // je crée un nouvel article avec les données du formulaire
        Post::create([
            'title' => $data['title'],
            'body' => $data['body'],
            'image' => $imageName,
            'rating_id' => $data['rating_id'],
            'public' => $public,
            'slug' => $slug,
            'user_id' => $user_id
         ])->saveOrFail(); // si l'article n'est pas créé, une erreur est renvoyée

        //  je crée un message de succès
        session()->flash("success", "Votre article a bien été ajouté !");

        // je redirige vers la page d'accueil
        return redirect()->route('posts.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePostRequest  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        // je supprime l'article
        $post->delete();

        //  je crée un message de succès
        session()->flash("success", "Votre article a bien été supprimé !");

        // je redirige vers la page d'accueil
        return redirect()->route('posts.index');
    }
}
