<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\PetOrganizationService;
use DB;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function getOrganizationService($page = 1)
    {
        sleep(4);
        $rowlength = DB::select("SELECT table_rows FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema = 'petcaring' AND table_name = 'pet_organization_services';")[0]->table_rows;
        $pagelength = $rowlength/5;
        $data = PetOrganizationService::with(["service","breed", "petorganization"])->offset(($page-1)*5)->limit(5)->get();
        return response()->json(["data"=>$data, "totapage"=>$pagelength], 200);
    }
}
