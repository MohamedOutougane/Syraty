<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <title>Accueil - ItsMe</title>
    </head>
    <body>
        <header>
        @include('header')
        </header>


        <div class="posts-wrapper">

            <!-- <div class="posts-creator">
                <div class="creator-title">
                    Créer un post
                </div>
                <div class="creator-button">
                    <button>+</button>
                </div>
                 <a href="{{ route('posts.create') }}">
                </a>
                <div class="posts-form">
                    <form action="">
                        
                    </form>
                </div>
            </div> -->

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
                                        <img src="{{ asset($post->image) }}" alt="Image de l'article">
                                    </a>
                                </div>
                            @else
                                <div class="post-image">
                                    <a href="{{ route('posts.show', $post->id) }}">
                                        <img src="{{ asset($post->image) }}" alt="Image de l'article">
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

            {{ $posts->links() }}
        </div>

        <footer>
        @include('footer')
        </footer>
    </body>
</html>
    

