<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.1/css/fontawesome.min.css" integrity="sha384-QYIZto+st3yW+o8+5OHfT6S482Zsvz2WfOzpFSXMF9zqeLcFV0/wlZpMtyFcZALm" crossorigin="anonymous">
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <title>Accueil - ItsMe</title>
    </head>
    <body>
        <header>
        @include('header')
        </header>


        <div class="posts-wrapper">

            <div class="posts-creator">
                <div class="creator-title">
                    Créer un post
                </div>
                <div class="form-container">
                    <form action=" {{ route('posts.store') }} " method="post" class ="form-action-post" enctype="multipart/form-data">
                        @csrf
                        @component('components.formInput', [
                            'title' => 'Title',
                            'name' => 'title',
                            'type' => 'text',
                            'value' => $newPost->title
                        ])
                        @endComponent
                        
                        @component('components.formInput', [
                            'title' => 'Contenu',
                            'name' => 'body',
                            'type' => 'textarea',
                            'value' => $newPost->body
                        ])
                        @endComponent

                        @component('components.formInput', [
                            'title' => 'Image',
                            'name' => 'image',
                            'type' => 'file',
                            'value' => $newPost->image
                        ])
                        @endComponent

                        @component('components.formInput', [
                            'title' => 'Note',
                            'options' => $ratings,
                            'name' => 'rating_id',
                            'type' => 'select',
                            'value' => $newPost->rating_id
                        ])
                        @endComponent
                        
                        @component('components.formInput', [
                            'title' => 'Public ?',
                            'name' => 'public',
                            'type' => 'checkbox'
                        ])
                        @endComponent

                        <button type="submit">Poster</button>
                    </form>
                </div>

                
                <div class="creator-button">
                    <button><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>

            <h1>Mon fil</h1>
            <ul>
                @foreach ($posts as $post)
                    <div class="post">
                        <div class="post-title">
                            <a href="{{ route('posts.show', $post->id) }}">
                                {{ $post->title }}  -  {{ $post->user->name }}  -  {{ $post->created_at->locale('fr_FR')->format('d M Y') }}
                            </a>
                        </div>
                        <div class="post-content">
                            @if ($post->id % 2 == 0)
                                <div class="post-body">
                                    <a href="{{ route('posts.show', $post->id) }}">
                                        {{ $post->body }}
                                    </a>
                                </div>
                                <div class="post-image">
                                    <a href="{{ route('posts.show', $post->id) }}">
                                        <img src="{{ asset('storage/' . $post->image) }}" alt="Image de l'article">
                                    </a>
                                </div>
                            @else
                                <div class="post-image">
                                    <a href="{{ route('posts.show', $post->id) }}">
                                        <img src="{{ asset('storage/' . $post->image) }}" alt="Image de l'article">
                                    </a>
                                </div>
                                <div class="post-body">
                                    <a href="{{ route('posts.show', $post->id) }}">
                                        {{ $post->body }}
                                    </a>
                                </div>
                            @endif
                        </div>
                        <div class="post-rating">
                            @switch($post->rating_id)
                                @case(1)
                                    <div class="circle red"></div>
                                    @break
                                @case(2)
                                    <div class="circle orange"></div>
                                    @break
                                @case(3)
                                    <div class="circle yellow"></div>
                                    @break@
                                @case(4)
                                    <div class="circle green"></div>
                                    @break
                                @case(5)
                                    <div class="circle blue"></div>
                                    @break
                                @default
                                    <div class="circle grey"></div>
                            @endswitch
                        </div>
                    </div>
                @endforeach
            </ul>

            <div class="paginator-wrapper">
                {{ $posts->links() }}
            </div>
        </div>

        <footer>
        @include('footer')
        </footer>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
    

