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
    public function index(Request $request)
    {

        //Si l'utilisateur n'est pas connecté, je le redirige vers la page de connexion
        if (!auth()->user()) {
            return view('auth.login');
        }

        // si l'url est égale à la route "index" alors je veux que la méthode "indexHome" soit exécutée 
        if ($request->url() !== null && $request->url() == route('index')) {
            return $this->indexHome();
        }


        //je veux l'id de l'user connecté
        $user_id = auth()->user()->id;
        
        
        // je verifie si l'utilisateur a fait une recherche 
        if (request()->get('search') || request()->get('start_date') || request()->get('end_date') || request()->get('rating')) {

            // je veux récuperer les posts de l'utilisateur connecté
            $posts = Post::where('user_id', $user_id)
              ->where(function ($query) { 
                $search = request()->get('search');
                $start_date = request()->get('start_date');
                $end_date = request()->get('end_date');
                $rating = request()->get('rating');
                if ($search) {
                    $query->where('title', 'like', '%'.$search.'%')
                        ->orWhere('body', 'like', '%'.$search.'%');
                }
                if ($start_date) {
                    $query->where('created_at', '>=', $start_date);
                }
                if ($end_date) {
                    $query->where('created_at', '<=', $end_date);
                }
                if ($rating) {
                    $query->where('rating_id', $rating);
                }
              })->with('user')->latest()->paginate(7);
        } else {
            //Je veux récuperer seulement les posts de l'utilisateurs connecté et les trié par plus récent et les pagineer de 7 en 7
            $posts = Post::where('user_id', auth()->user()->id)->with('user')->latest()->paginate(7);
        }

        // je veux récuperer toutes les notes
        $ratings = Rating::all();
        // j'instancie un nouvel article vide pour le formulaire de création d'article
        $newPost = new Post();

        // et les envoie à la vue "posts.index" pour les afficher.
        return view('posts.index', compact('posts', 'newPost', 'ratings', 'user_id'));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexHome()
    {

        if (request()->get('search') || request()->get('start_date') || request()->get('end_date') || request()->get('rating')) {

            $posts = Post::where('public', 1)
              ->where(function ($query) { 
                $search = request()->get('search');
                $start_date = request()->get('start_date');
                $end_date = request()->get('end_date');
                $rating = request()->get('rating');
                if ($search) {
                    $query->where('title', 'like', '%'.$search.'%')
                        ->orWhere('body', 'like', '%'.$search.'%');
                }
                if ($start_date) {
                    $query->where('created_at', '>=', $start_date);
                }
                if ($end_date) {
                    $query->where('created_at', '<=', $end_date);
                }
                if ($rating) {
                    $query->where('rating_id', $rating);
                }
              })->with('user')->latest()->paginate(7);
        } else {
            $posts = Post::where('public', 1)->with('user')->latest()->paginate(7);
        }

        // je veux savoir si je suis sur la page d'accueil
        $IAmInTheHomePage = true;

        //je veux l'id de l'user connecté
        if (auth()->user()) {
            $user_id = auth()->user()->id;
            
        } else {
            $user_id = null;
        }

        // je récupère tous les ratings
        $ratings = Rating::all();

        return view('index', compact('posts', 'ratings', 'user_id', 'IAmInTheHomePage'));
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

        //je veux l'id de l'user connecté
        $user_id = auth()->user()->id;

        // je remplace les apostrophes par des tirets dans le titre
        $titleForSlug = str_replace("'", '-', $data['title']);

        // je remplace les espaces par des tirets dans le titre
        $slug = $user_id . '_' .str_replace(' ', '-', $titleForSlug);

        // je donne un nom à l'image avec le nom de l'utilisateur, le titre de l'article et le timestamp
        if($request->image){
            $imageName = $slug . '_' . time() . '.' . $request->image->extension();
            // je déplace l'image dans le dossier "public/storage" du projet
            $request->image->move(public_path('storage'), $imageName);
        } else {
            $imageName = null;
        }

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

    //fonction qui récupère les articles pour l'Api
    public function getPosts()
    {
        $posts = Post::all();
        return response()->json($posts, 200);
    }

    //fonction qui récupère un article par son id pour l'Api
    public function getPostById($id)
    {
        $postById = Post::find($id);
        if(is_null($postById)){
            return response()->json(['message' => 'Post not found'], 404);
        } else {
            return response()->json($postById, 200);
        }
    }

    // fonction qui ajoute un article
    public function addPost(Request $request)
    {
        // $post = Post::create($request->all());

        //je veux l'id de l'user connecté
        // $user_id = auth()->user()->id;
        $user_id = 11;


        // je récupère les données du formulaire
        $data = $request->all();

        // je remplace les apostrophes par des tirets dans le titre
        $titleForSlug = str_replace("'", '-', $data['title']);

        // je remplace les espaces par des tirets dans le titre
        $slug = $user_id . '_' .str_replace(' ', '-', $titleForSlug);

        // je donne un nom à l'image avec le nom de l'utilisateur, le titre de l'article et le timestamp
        if($request->image){
            $imageName = $slug . '_' . time() . '.' . $request->image->extension();
            // je déplace l'image dans le dossier "public/storage" du projet
            $request->image->move(public_path('storage'), $imageName);
        } else {
            $imageName = null;
        }

        // définit la valeur de $public si la clé "public" existe dans $data à 1, sinon elle est définie à 0.
        $public = array_key_exists('public', $data) ? 1 : 0;

        // je crée un nouvel article avec les données du formulaire
        $post = Post::create([
            'title' => $data['title'],
            'body' => $data['body'],
            'image' => $imageName,
            'rating_id' => $data['rating_id'],
            'public' => $public,
            'slug' => $slug,
            'user_id' => $user_id
        ])->saveOrFail(); // si l'article n'est pas créé, une erreur est renvoyée

        return response($post, 201);
    }

    // // fonction qui modifie un article
    // public function updatePost(Request $request, $id)
    // {
    //     $post = Post::find($id);
    //     if(is_null($post)){
    //         return response()->json(['message' => 'Post not found'], 404);
    //     } else {

    //         // je mets a jour mon article seulment si il y a des valeurs modifé dans la requete sinon je garde les originaux
    //         $post = $post->update([
    //             'title' => $request->title ? $request->title : $post->title,
    //             'body' => $request->body ? $request->body : $post->body,
    //             'image' => $request->image ? $request->image : $post->image,
    //             'rating_id' => $request->rating_id ? $request->rating_id : $post->rating_id,
    //             'public' => $request->public ? $request->public : $post->public,
    //             'slug' => $request->slug ? $request->slug : $post->slug,
    //             'user_id' => $request->user_id ? $request->user_id : $post->user_id
    //         ]);

    //         return response($post, 200);
    //     }
    // }

    // fonction qui supprime un article
    public function deletePost($id)
    {
        $post = Post::find($id);
        if(is_null($post)){
            return response()->json(['message' => 'Post not found'], 404);
        } else {

            //je supprime l'image de l'article
            if($post->image){
                unlink(public_path('storage/' . $post->image));
            }

            $post->delete();
            return response()->json(null, 204);
        }
    }
}
