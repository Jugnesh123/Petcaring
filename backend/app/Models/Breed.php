<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Breed extends Model
{

    protected $fillable = ['name', "service"];
    use HasFactory;
    public function species()
    {
        return $this->hasOne(Species::class, "id", "species");
    }
}
