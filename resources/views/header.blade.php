<div class="header-top">
    <div class="logo">
        <a href="{{ route('index') }}">
            <img src="{{ asset('images/logoItsMe.png') }}" alt="ItsMe">
        </a>
    </div>
    <div class="navigation">
        <ul>
            @if (!isset($user_id))
                <li class="navigation-selected"><a href="{{ route('index') }}">Les autres</a></li>         
            @else 
                <li><a href="{{ route('index') }}">Les autres</a></li>
            @endif

            @if (isset($user_id))
                <li class="navigation-selected"><a href="{{ route('posts.index') }}">Moi</a></li>
            @else 
                <li><a href="{{ route('posts.index') }}">Moi</a></li>
            @endif

            <li><a href="{{ route('posts.index') }}">Contact</a></li>
        </ul>
    </div>
    <div class="authentification">
        <ul>
            @if (!isset($user_id))
                <li><a href="{{ route('login') }}">Connexion</a></li>
                <button class="register-button"><a href="{{ route('register') }}">Inscription</a></button>       
            @else 
                <form method="POST" action="{{ route('logout') }}">
                    @csrf

                    <button type="submit">
                        <li>Déconnexion</li>
                    </button>
                </form>
            @endif
        </ul>
    </div>
</div>
<div class=" stylised-border"></div>