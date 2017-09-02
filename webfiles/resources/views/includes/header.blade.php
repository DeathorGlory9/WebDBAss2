<link rel="stylesheet" href="../public/css/header.css">

<div class="navbar content-container">
	<a id="logo" href="/">
		<img src="{{asset('images/logo.jpg')}}" width="200">
	</a>
	@if (Auth::check())
		<h4>{{Html::link('/logout', 'Logout', array('id'=>'login'))}}</h4>
	@else
		<h4>{{Html::link('/login', 'Login', array('id'=>'login'))}}</h4>
		<h4>{{Html::link('/register', 'Register', array('id'=>'register'))}}</h4>
	@endif
</div>
<div class="nav-container">
	<div class="content-container">
		<nav>
		    <ul class="nav nav-justified">
		        <li>{{Html::link('/index', 'Home' )}}</li>
		        <li>{{Html::link('/faq', 'FAQ')}}</li>
				<li>{{Html::link('/viewticket', 'View Tickets')}}</li>
				@if (Auth::check())
		        	<li>{{Html::link('/submitticket', 'Submit Ticket')}}</li>
				@endif
		    </ul>
		</nav>
	</div>
</div>
