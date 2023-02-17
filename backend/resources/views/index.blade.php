<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.1/css/fontawesome.min.css" integrity="sha384-QYIZto+st3yW+o8+5OHfT6S482Zsvz2WfOzpFSXMF9zqeLcFV0/wlZpMtyFcZALm" crossorigin="anonymous">
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <title>Les autres - Syraty</title>
    </head>
    <body>
        <header>
        @include('header')
        </header>


        <div class="posts-wrapper">

        <div class="search-container">
            @include('search')
        </div>

            <div class="posts-fil">
                 @foreach ($posts as $index => $post)
                    <div class="post">
                        <div class="post-entete">
                            <div class="post-title">
                                {{ $post->title }}  -  {{ $post->user->name }}  -  {{ $post->created_at->locale('fr_FR')->format('d M Y') }}
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
                        <div class="post-content">
                            @if ($index % 2 == 0)
                                <div class="post-body">
                                    {{ $post->body }}
                                </div>
                                <div class="line-syraty"> </div>
                                <div class="post-image fill"
                                    style="background-image: url('{{ asset('storage/' . $post->image) }}');">
                                </div>
                            @else
                                <div class="post-image fill"
                                    style="background-image: url('{{ asset('storage/' . $post->image) }}');">
                                </div>
                                <div class="line-syraty"> </div>                           
                                <div class="post-body">
                                    {{ $post->body }}
                                </div>
                            @endif
                        </div>
                    </div>
                @endforeach
                <img class="navigationImg" src="{{ asset('images/navigation.png') }}" "alt="">
            </div>

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
    

