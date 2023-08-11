<?php


namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Pet;
use App\Models\Petimage;
use Illuminate\Http\Request;

class PetController extends Controller
{
    //
    public function add(Request $request)
    {
        $userid = $request->session()->get("user");
        $name = $request->input("name");
        $breed = $request->input("breed");
        $profile = $request->input("profile");
        $userid = $userid[0];
        $pet = Pet::create(["name" => $name, "user" => $userid, "breed" => $breed, "profile" => $profile]);
        if ($pet->save()) {
            return response()->json([
                "message" => "add Succesfull",
            ], 200);
        } else {
            return response()->json([
                "message" => "add unsuccesfull",
            ], 200);
        }

    }
    public function getAll(Request $request)
    {
        $userid = $request->session()->get("user");
        $userid = $userid[0];
        $data = Pet::with("breed")->where('user', $userid)->get();
        return response()->json($data, 200);
    }
    public function get($id, Request $request)
    {
        $userid = $request->session()->get("user");
        $userid = $userid[0];
        $data = Pet::with("breed")->where([["id", $id],['user', $userid]])->get()[0];
        return response()->json($data, 200);
    }

    public function delete($id, Request $request)
    {

        Pet::find($id)->delete();
        return response()->json(["message" => "delete successfully"], 200);

    }

    public function update($id, Request $request)
    {


        Pet::find($id)->update($request->input());
        return response()->json(["message" => "update successfully"], 200);


    }

    public function getimage($id, Request $request)
    {


        $data = Petimage::select("image")->where("pet", $id)->get();
        return response()->json($data, 200);


    }

    public function removeimage($id, Request $request)
    {

        Petimage::where([["Pet", $id], ["image", $request->input("image")]])->delete();
        return response()->json(["message" => "image removed successfully"], 200);




    }

    public function storeimage($id, Request $request)
    {

        $images = $request->input("image");
        foreach ($images as $image) {
            Petimage::create(['image' => $image, "pet" => $id]);

        }
        return response()->json(["message" => "image stored successfully"], 200);



    }


}