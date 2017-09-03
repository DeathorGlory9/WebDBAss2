<?php

namespace App\Http\Controllers;
use Auth;

use App\Comment;
use Illuminate\Http\Request;
use App\Ticket;
use DB;

class TicketController extends Controller
{
    public function create()
    {
        $ticket = new Ticket();
        return view('pages.submitticket', ['ticket' => $ticket]);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'issueTitle' => 'required|max:75',
            'os' => 'required|max:50',
            'description' => 'required',
        ]);

		$ticket = [
			'userid' => Auth::id(),
			'issueTitle' => $request->issueTitle,
			'os' => $request->os,
			'description' => $request->description,];

        $ticket = Ticket::create($ticket);

		return redirect()->route('pages.viewticket', [$ticket->id]);
    }

	public function show($id)
    {
		$ticket = DB::table('tickets')->where('id', $id)->first();
		$user = DB::table('users')->where('id', $ticket->userid)->first();
		$comments = DB::table('comments')->where('ticketId', $id)->orderBy('created_at', 'ASC')->get();

		return view('pages.viewticket', ['ticket' => $ticket,'user' => $user,'comments' => $comments] ) ;
    }

	public function showall()
    {
		$tickets = DB::table('tickets')->get();

		return view('pages.viewalltickets', ['tickets' => $tickets] ) ;
    }

    public function getAll()
    {
        $tickets = DB::table('tickets')->get();

        return view('pages.its', ['tickets' => $tickets]);
    }

    public function storeComment(Request $request)
	{
        $this->validate($request, [
            'comment' => 'required|max:250',
            'author' => 'required|max:50'
        ]);

        Comment::create($request->all());

        return redirect()->route('pages.viewticket', [$request->ticketid]);
    }

	public function updateTicketStatus(Request $request)
	{

		$ticket = DB::table('tickets')->where('id', $request->ticketid)->update(array('status' => $request->status));

		$tickets = DB::table('tickets')->get();

        return view('pages.its', ['tickets' => $tickets]);
	}
}
