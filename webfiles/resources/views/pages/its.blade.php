@extends('layouts.default')
@section('content')
    <link href="{{ asset('/css/home.css') }}" rel="stylesheet">
    <div class="content-container home-content-container">
        <div class="home-container">
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                @foreach($tickets as $ticket)
                  <tr>
                      <td>{{ $ticket->issueTitle }}</td>
                      <td>
						  {{ Form::open(['route' => 'update_ticket_status', 'enctype' => 'multipart/form-data']) }}
						  	<div style="display:none;">
								{!! Form::text('ticketid', $ticket->id, array('value'=>'$ticket->id')) !!}
						  	</div>
							  {{ Form::select('status', array(
							   'Pending' => 'Pending',
							   'In Progress' => 'In Progress',
							   'Unresolved' => 'Unresolved',
							   'Resolved' => 'Resolved'), $ticket->status
							) }}
							<input type="submit" id="btnSubmitComment" name="btnSubmitComment" value="Update">
						</form>
					</td>
                      <td>{{ $ticket->description }}</td>
                  </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
@stop
