@extends('layouts.default')
@section('content')
	<link href="{{ asset('/css/viewallticket.css') }}" rel="stylesheet">
	<div class="content-container-small view-ticket-container">
		<div class="row">
			<div class="col-md-12">
				<table>
					<tr>
						<th>Ticket issue</th><th>Status</th><th>Os</th><th></th>
					</tr>
					@foreach ($tickets as $ticket)
						<tr>
							<td>{{$ticket->issueTitle}}</td>
							<td>{{$ticket->status}}</td>
							<td>{{$ticket->os}}</td>
							<td><a href="/WebDBAss1/webfiles/public/viewticket/{{$ticket->id}}">View ticket</a></td>
						</tr>
					@endforeach
				</table>
			</div>
		</div>
	</div>
@stop
