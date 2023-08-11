<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class SearchController extends Controller
{
    public function petorganization(Request $request)
    {
        $request->validate([
            'q' => 'required'
        ]);
        $params = $request->input();
        $data = User::where('name', 'LIKE','%'.$params["q"].'%')->get();
        return response()->json($data, 200);
    }
}
