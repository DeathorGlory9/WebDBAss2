<?php

namespace App\Http\Controllers;
use Auth;
use Exception;
use App\Comment;
use Illuminate\Http\Request;
use App\TechUser;
use DB;

class TechUserController extends Controller
{
    // Api functions
    // Get all tickets
    public function getAllTechUsers()
    {
		$techusers = DB::table('techusers')->get();

		return $techusers;
    }

    //Add a comment to a ticket
    public function addTechUser(Request $request, $id, $name)
    {
        try
        {
            $user = DB::table('tickets')->where('id', $id)->get();

            if ($user->isEmpty())
            {
                $techuser =[
                    'id' => $id,
                    'displayName' => $name
                ];

                TechUser::create($techuser);

                return "tech user added";
            }
        }
        catch(Exception $e)
        {
            return $e;
        }
    }
}
