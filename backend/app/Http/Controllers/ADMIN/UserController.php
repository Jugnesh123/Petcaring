<?php

namespace App\Http\Controllers\ADMIN;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function count(){
        $users = User::select("bussinessname")->get();
        $petorganization = 0;
        $petowner = 0;
        foreach($users as $user){
            if(is_null($user->bussinessname))
                $petowner++;
            else
                $petorganization++;
            
            
        }
        return view("welcome")->with(["petowner"=>$petowner, "petorganization"=>$petorganization]);
    }
}