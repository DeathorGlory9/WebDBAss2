@extends('layouts.default')
@section('content')
	<link href="{{ asset('/css/home.css') }}" rel="stylesheet">
	<div class="content-container home-content-container">
		<div class="home-container">
			<div>
				<div class="home-row home-large-row">
					<div class="home-image-container">
						<img class="home-image" src="../public/images/pexels-photo-371794.jpeg">
						<div class="image-text-container">
							<h1 class="image-text">Welcome to the RMIT help desk!</h1>
						</div>
					</div>
				</div>
				<div class="home-row home-small-row">
					<div class="home-div-50" style="padding-right:25px;">
						<div class="home-image-container">
							<img class="home-image" src="../public/images/pexels-photo-371794.jpeg">
							<div class="image-text-container home-image-link">
								<a href="faq" class="image-text">FAQ</a>
							</div>
						</div>
					</div>
					<div class="home-div-50">
						<div class="home-image-container">
							<img class="home-image" src="../public/images/pexels-photo-371794.jpeg">
							<div class="image-text-container home-image-link">
								<a href="submitticket" class="image-text">Submit a Ticket</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
@stop
