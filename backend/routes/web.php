<?php

use App\Http\Controllers\ADMIN\UserController;
use App\Http\Controllers\ORG\UserController as OrgController;
use App\Models\Breed;
use App\Models\PetOrganizationService;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });
Route::prefix("/admin")->group(function () {

    Route::get("/", [UserController::class, "count"]);
    Route::get("/database", function () {

        $tables = DB::select("SELECT table_name, table_rows, create_time, update_time FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema = 'petcaring' AND table_name NOT In ('personal_access_tokens','migrations','password_reset_tokens','failed_jobs') ORDER BY table_name;");
        return view("databasedetail")->with("tables", $tables);

    });
    function convert_object_to_array($data)
    {

        if (is_object($data)) {
            $data = get_object_vars($data);
        }

        if (is_array($data)) {
            return array_map(__FUNCTION__, $data);
        } else {
            return $data;
        }
    }
    Route::get("/database/{name}", function ($name) {
        $rowlength = DB::select("SELECT table_rows FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema = 'petcaring' AND table_name = '$name';")[0]->table_rows;
        $tableheadername = DB::select("SELECT column_name FROM information_schema.columns WHERE table_schema = 'petcaring' AND table_name = '$name';");
        $length = ceil($rowlength / 10);
        $tables = convert_object_to_array(DB::select("SELECT * from $name LIMIT 10;"));
        $next = null;
        if ($length > 1) {
            $next = 2;
        }
        return view("database")->with(["tablenames" => $tableheadername, "tables" => $tables, "name" => $name, "next" => $next, "back" => null]);
    });

    Route::get("/database/{name}/{page}", function ($name, $page) {
        $rowlength = DB::select("SELECT table_rows FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema = 'petcaring' AND table_name = '$name';")[0]->table_rows;
        $tableheadername = DB::select("SELECT column_name FROM information_schema.columns WHERE table_schema = 'petcaring' AND table_name = '$name';");
        $nextpage = (((int) $page) - 1) * 10;
        $length = ceil($rowlength / 10);
        $next = null;
        if ($length > $page) {
            $next = $page + 1;
        }
        $back = null;
        if ($page > 1) {
            $back = $page - 1;
        }
        if ($length >= $page) {
            $tables = convert_object_to_array(DB::select("SELECT * from $name LIMIT " . $nextpage . ", 10;"));
            return view("database")->with(["tablenames" => $tableheadername, "tables" => $tables, "name" => $name, "next" => $next, "back" => $back]);
        } else {
            return view("database")->with(["tablenames" => $tableheadername, "tables" => [], "name" => $name, "next" => null, "back" => null]);
        }
    });
});
Route::middleware("auth")->group(function () {
    Route::get("/", function () {
        $user = Auth::id();
        $name = "transactions";
        $tableheadername = DB::select("SELECT column_name FROM information_schema.columns WHERE table_schema = 'petcaring' AND table_name = '$name';");
        unset($tableheadername[3], $tableheadername[10]);
        $tables = convert_object_to_array(DB::select("SELECT * from $name where petorganization	= $user"));
        return view("org-welcome")->with(["tablenames" => $tableheadername, "tables" => $tables, "name" => $name]);
    });
    Route::prefix("/service")->group(function () {
        Route::get("/", function(){
            $user = Auth::id();
            $name = "pet_organization_services";
            $tableheadername = DB::select("SELECT column_name FROM information_schema.columns WHERE table_schema = 'petcaring' AND table_name = '$name';");
            unset($tableheadername[1]);
            $tables = convert_object_to_array(DB::select("SELECT * from $name where petorganization	= $user"));
            return view("org-service")->with(["tablenames" => $tableheadername, "tables" => $tables, "name" => $name]);
        });
        Route::get("/delete/{id}", function($id){
            PetOrganizationService::where("id", $id)->first()->delete();
            return redirect("/service");
        });
        Route::get("add", function(){
            $breed = Breed::all();
            $service = Service::all();
            return view("org-service-add")->with(["breed"=>$breed, "service"=>$service]);
        });
        Route::post("add", function(Request $request){
            $params = $request->input();
            unset($params["_token"]);
            $imageName = time().'.'.$request->profile->extension();  
            $request->profile->move(public_path('images'), $imageName);
            $params["profile"] = "/images/$imageName";
            $params["petorganization"]=Auth::id();
            if (PetOrganizationService::create($params)->save()) {
                return redirect("/service");
            }
            return back()->withErrors([
                'message' => 'Something wrong',
            ])->onlyInput('message'); 
        });
    });
});
Route::view("/login", "org-login")->name("login");
Route::view("/register", "org-register");
Route::controller(OrgController::class)->group(function () {
    Route::post("/user/login", "login");
    Route::post("/user/register", "register");
    Route::get("/user/logout", "logout");
});