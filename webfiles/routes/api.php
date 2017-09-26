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
});
