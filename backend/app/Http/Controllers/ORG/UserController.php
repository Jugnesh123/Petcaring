<?php

namespace App\Http\Controllers\ORG;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
    
class UserController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
        
        if (Auth::attempt(["email"=>$request["email"], "password"=>$request["password"]], True)) {
            return redirect("/");
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }
    public function logout(Request $request)
    {   
        Auth::logout();
        return redirect("/");
    }
    public function register(Request $request)
    {
        $this->validate($request, [
            'profile' => 'required|image|mimes:jpg,png,jpeg,gif,svg',
        ]);
        $params = $request->input();
        unset($params["_token"]);
        $imageName = time().'.'.$request->profile->extension();  
        $request->profile->move(public_path('images'), $imageName);
        $params["profile"] = "/images/$imageName";
        $params["password"] = Hash::make($params["password"]);
        if(User::create($params)->save()){
            return redirect("/login");
        }
        return back()->withErrors([
            "message"=>"Something Wrong"
        ])->onlyInput("message");
    }
}