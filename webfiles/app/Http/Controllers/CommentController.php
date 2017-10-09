<?php

namespace App\Http\Controllers;
use Auth;
use Exception;
use App\Comment;
use Illuminate\Http\Request;
use DB;

class CommentController extends Controller
{
    public function storeComment(Request $request)
	{
	     $this->validate($request, [
	         'comment' => 'required|max:250',
	         'author' => 'required|max:50'
	     ]);

	     Comment::create($request->all());

	     return redirect()->route('pages.viewticket', [$request->ticketid]);
	 }

     //Add a comment to a ticket
     public function addComment(Request $request, $id, $comment, $author)
     {
         try
         {
             $comment =[
                 'ticket_id' => $id,
                 'comment' => $comment,
                 'author' => $author
             ];

             Comment::create($comment);

             return "Comment added";
         }
         catch(Exception $e)
         {
             return "fail";
         }
     }
}
