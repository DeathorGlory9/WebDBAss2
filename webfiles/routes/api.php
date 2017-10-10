<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//React api methods
Route::group(['middleware' => 'cors'], function () {
    //Ticket api
    //Get all ticket data
    Route::get('tickets/returnAll','TicketController@getAllTickets');
    //Get one ticket
    Route::get('tickets/returnTicket/{id}','TicketController@getTicket');
    //Update ticket status
    Route::put('tickets/statusupdate/{id}/{status}','TicketController@updateTicketStatus');
    //Update ticket priority
    Route::put('tickets/priorityupdate/{id}/{priority}','TicketController@updateTicketPriority');
    //Update ticket escalation
    Route::put('tickets/escalationupdate/{id}/{escalation}','TicketController@updateTicketEscalation');
    //assign a ticket to a user
    Route::put('tickets/assignTicket/{ticketId}/{userId}','TicketController@assignTicket');
	 //Get all ticket comments
    Route::get('comments/get/{ticketId}','TicketController@getComments');
    //get all tickets assigned to the user
    Route::get('comments/getAllTicketsAssigned/{userId}','TicketController@getAllTicketsAssigned');
    //create ticket
    Route::post('tickets/create', 'TicketController@createTicket');
    //Comment api
    //Add comment to ticket
    Route::post('comments/add/{id}/{comment}/{author}','CommentController@addComment');
    //Tech user api
    //get all tech users
    Route::get('techusers/getAllTechUsers','TechUserController@getAllTechUsers');
    //get tech users
    Route::get('techusers/getTechUser/{id}','TechUserController@getTechUsers');
    //create ticket
    Route::post('techusers/create/{id}/{name}', 'TechUserController@addTechUser');
});
