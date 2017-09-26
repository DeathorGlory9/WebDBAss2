<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/', function () {
    return view('pages/index');
});

Route::get('index', function () {
    return view('pages/index');
});

Route::get('faq', function () {
	return view('pages/faq');
});

Route::group(['middleware' => ['auth']], function() {
    Route::get('submitticket', 'TicketController@create');
});

Route::get('/logout', 'HomeController@logout');

Route::get('viewticket', 'TicketController@showAllTickets');

Route::get('viewticket/{id}', 'TicketController@viewTicket')->name('pages.viewticket');;

Route::resource('tickets', 'TicketController');

Route::post('viewticket/', ['uses' => 'TicketController@storeComment', 'as' => 'create_comment']);

Route::post('its', ['uses' => 'TicketController@updateTicketStatus', 'as' => 'update_ticket_status']);
