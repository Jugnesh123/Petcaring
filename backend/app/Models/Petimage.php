<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Petimage extends Model
{
    protected $fillable = ['pet', 'image'];
    use HasFactory;
}
