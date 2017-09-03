@extends('layouts.default')
@section('content')
<link href="{{ asset('/css/viewticket.css') }}" rel="stylesheet">
<div class="content-container-small view-ticket-container">
	<div class="row">
		<div class="col-md-6">
			<div class="row">
				<div class="col col-md-12">
					<h3 class="page-header">Ticket View</h3>
				</div>
			</div>
			<div class="row">
				<div class="col col-md-12">
					<p id="tikStatus">Status: {{$ticket->status}}</p>
				</div>
			</div>
			<div class="row">
				<div class="col col-md-12">
					<p id="tikFName">Name: {{$user->firstName}} {{$user->lastName}}</p>
				</div>
			</div>
			<div class="row">
				<div class="col col-md-12">
					<p id="tikIssueTitle">Issue: {{$ticket->issueTitle}}</p>
				</div>
			</div>
			<div class="row">
				<div class="col col-md-12">
					<p id="tikOS">OS: {{$ticket->os}}</p>
				</div>
			</div>
			<div class="row">
				<div class="col col-md-12">
					<p id="tikDescription">Description:<br/>{{$ticket->description}}</p>
				</div>
			</div>
		</div>
		<div id="comments-container" class="col-md-6">
			<div class="row">
				<div class="col-md-12">
					<p>Issue comments</p>
				</div>
			</div>
			<div id="comment-container-row" class="row">
				<div id="comment-section" class="col-md-12">
					@foreach ($comments as $comment)
						<div class="comment">
							<p class="commentAuthor">{{$comment->author}}</p>
							{{$comment->comment}}
						</div>
					@endforeach
					@if($comments->isEmpty())
						<div>
							No comments
						</div>
					@endif
				</div>
			</div>
		</div>
	</div>
</div>
@stop
