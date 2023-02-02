<div class="header-top">
    <div class="logo">
        <a href="{{ route('index') }}">
            <img src="{{ asset('images/logoItsMe.png') }}" alt="ItsMe">
        </a>
    </div>
    <div class="navigation">
        <ul>
            @if (isset($IAmInTheHomePage))
                <li class="navigation-selected"><a href="{{ route('index') }}">LES AUTRES</a></li>         
            @else 
                <li><a href="{{ route('index') }}">LES AUTRES</a></li>
            @endif

            @if (!isset($IAmInTheHomePage))
                <li class="navigation-selected"><a href="{{ route('posts.index') }}">MA BIO</a></li>
            @else 
                <li><a href="{{ route('posts.index') }}">MA BIO</a></li>
            @endif

            <li><a href="{{ route('posts.index') }}">PROFIL</a></li>
        </ul>
    </div>
    <div class="authentification">
        <ul>
            @if (!isset($user_id))
                <button class="connexion-button"><a href="{{ route('login') }}">Connexion</a></button>
                <button class="register-button"><a href="{{ route('register') }}">Inscription</a></button>
            @else 
                <form method="POST" action="{{ route('logout') }}">
                    @csrf

                    <button class="deconnexion-button" type="submit">
                        <li>Déconnexion</li>
                    </button>
                </form>
            @endif
        </ul>
    </div>
</div>
<div class=" stylised-border"></div>