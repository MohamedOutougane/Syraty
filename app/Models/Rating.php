<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Post;

class Rating extends Model
{
    use HasFactory;

    // La propriété $guarded pour attribut peuvent pas être affectés en masse. 
    // Par défaut, tous les attributs de la table sont affectables en masse, 
    // si envie limiter ça, je spécifie les attributs qui doivent pas être affectés 
    // en masse en définissant la propriété $guarded.
    protected $guarded = [];


    // La méthode "posts" permet de récupérer les posts associés à la note.
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
