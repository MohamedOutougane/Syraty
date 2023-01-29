<div class="header-top">
    <div class="logo">
        <a href="{{ route('posts.index') }}">
            <img src="{{ asset('images/logoItsMe.png') }}" alt="ItsMe">
        </a>
    </div>
    <div class="navigation">
        <ul>
            <li><a href="{{ route('posts.index') }}">Accueil</a></li>
            <li><a href="{{ route('posts.index') }}">A propos</a></li>
            <li><a href="{{ route('posts.index') }}">Contact</a></li>
        </ul>
    </div>
    <div class="authentification">
        <ul>
            <li><a href="{{ route('login') }}">Connexion</a></li>
            <button class="register-button"><a href="{{ route('register') }}">Inscription</a></button>
        </ul>
    </div>
</div>
<div class=" stylised-border"></div>