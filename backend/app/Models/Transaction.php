<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        "petowner",
        "pet",
        "petorganization",
        "startdate",
        "enddate",
        "service",
        "price",
        "status",
    ];
    use HasFactory;

    public function petorganization()
    {
        return $this->hasOne(User::class, "id", "petorganization")->select("id", "bussinessname", "profile");
    }
    public function service()
    {
        return $this->hasOne(Service::class, "id", "service")->select("id", "name");
    }
}
