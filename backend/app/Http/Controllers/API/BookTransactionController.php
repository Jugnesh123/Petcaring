<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\PetOrganizationService;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class BookTransactionController extends Controller
{
    public function book(Request $request)
    {
        $petorganizationservice = PetOrganizationService::where("id", (int)$request["orgservice"])->first();
        $startdate = Carbon::parse($request["startdate"]);
        $enddate = Carbon::parse($request["enddate"]);
        $price = 0;
        $difference=1;
        print_r($petorganizationservice->perday);
        if($petorganizationservice->perday)
            $difference = $enddate->diffInDays($startdate);
        else
            $difference = $startdate->diffInRealHours($enddate);
        if($difference<1)
            $difference=1;
        $price = $difference*$petorganizationservice->price;
        $data = [
            "petowner" => $request->session()->get("user")[0],
            "pet" => $request["pet"],
            "petorganization" => $request["petorganization"],
            "startdate" => $startdate,
            "enddate" => $enddate,
            "service" => $request["service"],
            "price" => $price,
            "status" => 0,
        ];
        $result = Transaction::create($data);
        if ($result->save()) {
            return response()->json(["message" => "Book Successfull", "0"=>"$difference", "1"=>$startdate, "2"=>$enddate], 200);
        } else {
            return response()->json(["message" => "Book unSuccessfull"], 400);
        }
    }
    public function getAll(Request $request)
    {
        sleep(5);
        $userid = $request->session()->get("user")[0];
        $data = Transaction::where("petowner", $userid)->with("service", "petorganization")->get();
        return response()->json($data, 200);
    }
    public function get($id, Request $request)
    {
        $data = Transaction::where("pet", $id)->with("service", "petorganization")->get();
        return response()->json($data, 200);
    }
    public function cancel($id, Request $request)
    {
        $result = Transaction::find($id)->update(["status" => -1]);
        if ($result->save()) {
            return response()->json(["message" => "Book cancel Successfull"], 200);
        } else {
            return response()->json(["message" => "Book cancel unSuccessfull"], 200);
        }
    }
}