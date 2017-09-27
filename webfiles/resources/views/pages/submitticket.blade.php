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
			<div class="col col-md-12">
				<h3 class="page-header">Submit Ticket</h3>
			</div>
			<div class="col-md-6">
				<div class="row">
					<div class="col col-md-12">
						{!! Form::text('issueTitle', null,
					        array('required',
					              'placeholder'=>'Issue Title')) !!}
					</div>
				</div>
				<div class="row">
					<div class="col col-md-12">
						{!! Form::select('os',
						array(	'placeholder' => 'OS',
								'Windows' => 'Windows',
								'Mac' => 'Mac',
								'Linux' => 'Linux')) !!}
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="row">
					<div class="col col-md-12">
						{!! Form::textarea('description', null,
					        array('required',
					              'placeholder'=>'Issue Description')) !!}
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
