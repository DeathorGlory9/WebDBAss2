<?php

namespace App\Http\Controllers;
use Auth;
use Exception;
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

    public function viewTicket($id)
    {
		$ticket = DB::table('tickets')->where('id', $id)->first();
		$user = DB::table('users')->where('id', $ticket->userid)->first();
		$comments = DB::table('comments')->where('ticketId', $id)->orderBy('created_at', 'ASC')->get();

		return view('pages.viewticket', ['ticket' => $ticket,'user' => $user,'comments' => $comments] ) ;
    }

	 public function showAllTickets()
	{
		$tickets = DB::table('tickets')->get();

		return view('pages.viewalltickets', ['tickets' => $tickets] ) ;
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

    // Api functions
    // Get all tickets
    public function getAllTickets()
    {
		$tickets = DB::table('tickets')->get();

		return $tickets;
    }

	 public function getTicket(Request $request, $id)
    {
		$tickets = DB::table('tickets')->where('id', $id)->get();

		return $tickets;
    }

    // Update a tickets status
    public function updateTicketStatus(Request $request, $id, $status)
	{
		$ticket = DB::table('tickets')->where('id', $id)->update(array('status' => $status));

        return "Update successful";
	}

    // Update a tickts priority
    public function updateTicketPriority(Request $request, $id, $priority)
	{
		$ticket = DB::table('tickets')->where('id', $id)->update(array('priority' => $priority));

        return "Update successful";
	}

    // Update a tickts escalation
    public function updateTicketEscalation(Request $request, $id, $escalation)
	{
		$ticket = DB::table('tickets')->where('id', $id)->update(array('escalation' => $escalation));

        return "Update successful";
	}

	//Add a comment to a ticket
	public function addComment(Request $request, $id, $comment, $author)
  {
		 $comment = [
			 'ticketid' => 1,
			  'comment' => $comment,
			  'author' => $author
		 ];

		 Comment::create($comment);

		 return "Comment added";
	}
}
