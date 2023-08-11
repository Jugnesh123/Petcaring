<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Hash;
use \App\Models\User;

class UserController extends Controller
{
    public function check(Request $request){
        return response()->json(["user" => $request->session()->get("user")[0]], 200);

    }
    public function petorganizationByid($id)
    {
        $data = User::find($id)->get()[0];
        return response()->json($data, 200);
    }
    public function register(RegisterRequest $request)
    {
        $fname = $request->input('firstname');
        $mname = $request->input('middlename');
        $lname = $request->input('lastname');
        $profile = $request->input('profile');
        $email = $request->input('email');
        $phone = $request->input('phone');
        $gender = $request->input('gender');
        $password = $request->input('password');
        $user = User::create(['firstname' => $fname, 'middlename' => $mname, 'lastname' => $lname, 'email' => $email, 'phone' => $phone, 'profile' => $profile, "password" => Hash::make($password), "gender" => $gender]);
        if ($user->save()) {
            return response()->json(["message" => "Account register Successfull", "user" => $user->id], 200);
        } else {
            return response()->json(["message" => "bad request"], 400);
        }
    }

    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');
        $user = User::where([["email", $email]])->first();
        if ($user) {
            if (Hash::check($password, $user->password)) {
                $request->session()->push('user', $user->id);
                return response()->json([], 200);
            } else {
                return response()->json(["message" => "password is incorrect", "password" => TRUE], 401);
            }
        } else {
            return response()->json(["message" => "email not register", "password" => FALSE], 401);
        }
    }
    public function genrateOtp($id, Request $request)
    {
        $otp = random_int(100000, 999999);
        $user = User::find($id)->first();
        error_log($user);
        if ($user) {

            while ($user->otp == $otp) {
                $otp = random_int(100000, 999999);
            }
            error_log($otp);
            $user->update(["otp" => $otp, "otptime" => (new \DateTime())]);
            return response()->json(["otp" => $otp], 200);
        } else {
            return response()->json(["message" => "forbbiden"], 403);
        }
    }
    public function checkOtp($id, Request $request)
    {
        $otp = $request->input('otp');
        if ($otp) {
            $user = User::find($id)->first();
            if ($user) {
                if ((new \DateTime($user->otptime))->add(new \DateInterval("P0DT0H5M0S")) >= (new \DateTime())) {
                    if ($user->otp == $otp)
                        return response()->json(["success" => true], 200);
                    else
                        return response()->json(["success" => false], 200);
                }
                else{
                    return response()->json(["success" => false, "timeout"=>true], 200);
                }
            } else {
                return response()->json(["message" => "forbbiden"], 403);
            }
        } else {
            return response()->json(["message" => "bad request"], 400);
        }
    }
}
