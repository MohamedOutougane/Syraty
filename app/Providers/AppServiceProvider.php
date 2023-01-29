<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Illuminate\Pagination\Paginator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Fonction qui permet de regler l'erreur 
        // "" SQLSTATE[42000]: Syntax error or access violation: 1071 La clé est trop longue. 
        //    Longueur maximale: 1000 (SQL: alter table `users` add unique `users_email_unique`(`email`))  ""
        Schema::defaultStringLength(191);


        // Fonction qui permet d'utiliser Bootstrap pour la pagination
        Paginator::useBootstrap();
    }
}
