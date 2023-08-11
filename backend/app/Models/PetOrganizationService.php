<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
class PetOrganizationService extends Model
{
    use HasFactory;
    protected $fillable = ['petorganization', "service", "breed", "price", "perday", "description", "profile"];
    public function breed()
    {
        return $this->hasOne(Breed::class, "id", "breed")->select("id", "name");
    }
    public function petorganization()
    {
        return $this->hasOne(User::class, "id", "petorganization")->select("id", "bussinessname", "profile");
    }
    public function service()
    {
        return $this->hasOne(Service::class, "id", "service")->select("id", "name");
    }
    public function descrddiption()
    {
        return $this->getRawOriginal('LEFT(`description`, 60) as `description`');
    }

}