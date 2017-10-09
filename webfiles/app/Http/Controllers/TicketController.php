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

	 // Get all tickts that are assigned to a specific help desk user
	 public function getAllTicketsAssigned(Request $request, $userId)
    {
		$tickets = DB::table('tickets')->where('assignedto', $userId)->get();

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
        try
        {
            $ticket = DB::table('tickets')->where('id', $id)->update(array('status' => $status));
            return "Update successful";
        }
        catch(Exception $e)
        {
            return "fail";
        }
	}

    // Update a tickts priority
    public function updateTicketPriority(Request $request, $id, $priority)
	{
        try
        {
    		$ticket = DB::table('tickets')->where('id', $id)->update(array('priority' => $priority));

            return "Update successful";
        }
        catch(Exception $e)
        {
            return "fail";
        }
	}

    // Update a tickts escalation
    public function updateTicketEscalation(Request $request, $id, $escalation)
	{
        try
        {
            $ticket = DB::table('tickets')->where('id', $id)->update(array('escalation' => $escalation));

            return "Update successful";
        }
        catch(Exception $e)
        {
            return "fail";
        }
	}

	public function assignTicket(Request $request, $ticketId, $userId)
	{
        try
        {
    		$ticket = DB::table('tickets')->where('id', $ticketId)->update(array('assignedto' => $userId));

            return "Ticket assigned";
        }
        catch(Exception $e)
        {
            return "fail";
        }
	}

    //Add a comment to a ticket
    public function addComment(Request $request, $id, $comment, $author)
    {
        try
        {
            $comment =[
                'ticketid' => 1,
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

    public function getComments(Request $request, $ticketId)
    {
        $comments = DB::table('comments')->where('ticketid', $ticketId)->get();

        return $comments;
    }

	public function createTicket(Request $request)
    {
        try
        {
            $ticket = new Ticket;

            $ticket->issueTitle = $request->input('issueTitle');
            $ticket->userid = $request->input('userid');
            $ticket->os = $request->input('os');
            $ticket->description = $request->input('description');
            $ticket->status = $request->input('status');
            $ticket->priority = $request->input('priority');
            $ticket->escalation = $request->input('escalation');
            $ticket->assignedto = $request->input('assignedto');

            if($ticket->save()) {
                return $ticket;
            }

            // throw new HttpException(400, "Invalid data");
        }
        catch(Exception $e)
        {
            return "fail";
        }
        //Ticket::create($ticket);
    }
}
