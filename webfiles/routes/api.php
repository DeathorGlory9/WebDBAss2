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
    Route::get('tickets/statusupdate/{id}/{status}','TicketController@updateTicketStatus');
    //Update ticket priority
    Route::get('tickets/statusupdate/{id}/{priority}','TicketController@updateTicketPriority');
    //Update ticket escalation
    Route::get('tickets/statusupdate/{id}/{escalation}','TicketController@updateTicketEscalation');
    //Add comment to ticket
    Route::get('comments/add/{id}/{comment}/{author}','TicketController@addComment');
    //get all tickets assigned to the user
    Route::get('comments/getAllTicketsAssigned/{userId}','TicketController@getAllTicketsAssigned');
    //assign a ticket to a user
    Route::get('comments/assignTicket/{ticketId}/{userId}','TicketController@assignTicket');
});
