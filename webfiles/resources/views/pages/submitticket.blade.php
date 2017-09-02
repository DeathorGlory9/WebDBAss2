@extends('layouts.default')
@section('content')
<link href="{{ asset('/css/submitticket.css') }}" rel="stylesheet">
<div class="content-container-small submit-ticket-container">
	{{ Form::open(array('action' => 'TicketController@store')) }}
	<!-- <form type="frmSubmit"> -->
		<div class="row">
			@if ($errors->any())
			<div class="row">
				<div class="col col-md-12">
					<div class="alert alert-danger">
						<ul>
							@foreach ($errors->all() as $error)
								<li>{{ $error }}</li>
							@endforeach
						</ul>
					</div>
				</div>
			</div>
			@endif
			<div class="col-md-6">
				<div class="row">
					<div class="col col-md-12">
						<h3 class="page-header">Submit Ticket</h3>
					</div>
				</div>
				<div class="row">
					<div class="col col-md-12">
					    {!! Form::text('firstName', null,
					        array('required',
					              'placeholder'=>'First Name')) !!}
						<!-- <input type="text" placeholder="First Name" name="firstName"> -->
					</div>
				</div>
				<div class="row">
					<div class="col col-md-12">
						{!! Form::text('lastName', null,
					        array('required',
					              'placeholder'=>'Last Name')) !!}
						<!-- <input type="text" placeholder="Last Name" name="txtLastName"> -->
					</div>
				</div>
				<div class="row">
					<div class="col col-md-12">
						{!! Form::text('email', null,
					        array('required', 'email',
					              'placeholder'=>'Email')) !!}
						<!-- <input type="text" placeholder="Email" name="txtEmail"> -->
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="row">
					<div class="col col-md-12">
						{!! Form::text('issueTitle', null,
					        array('required',
					              'placeholder'=>'Issue Title')) !!}
						<!-- <input type="text" placeholder="Issue Title" name="txtIssueTitle"> -->
					</div>
				</div>
				<div class="row">
					<div class="col col-md-12">
						{!! Form::text('os', null,
					        array('required',
					              'placeholder'=>'Your Operating system')) !!}
						<!-- <input type="text" placeholder="Your Operating system" name="txtOS"> -->
					</div>
				</div>
				<div class="row">
					<div class="col col-md-12">
						{!! Form::textarea('description', null,
					        array('required',
					              'placeholder'=>'Issue Description')) !!}
						<!-- <textarea name="txtaIssue" placeholder="Issue Description"></textarea> -->
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-last col-md-12">
				<input type="submit" id="btnSubmit" name="btnSubmit" value="Submit Ticket">
			</div>
		</div>
	</form>
</div>
@stop
