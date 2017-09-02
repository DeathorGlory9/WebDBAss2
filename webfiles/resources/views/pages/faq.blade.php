@extends('layouts.default')
@section('content')
<link href="{{ asset('/css/faq.css') }}" rel="stylesheet">

	<div class="content-container">
		<div class="row">
			<div class="col col-md-12">
    			<h3 class="page-header">Faq</h3>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">


<div id="accordion" class="panel-group">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h4 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">How do I connect to the wifi?</a>
            </h4>
        </div>
        <div id="collapseOne" class="panel-collapse collapse">
            <div class="panel-body">
				<p>Connecting is as simple as:</p>
				<ol>
				<li>Choosing RMIT-University.<ul>
				<li><strong>RMIT–University</strong> is available to RMIT students, RMIT staff and authorised visitors. This secure or ‘closed access’ network will appear in the wifi settings of your device. It enables authorised users to access the internet and RMIT’s network.</li>
				<li><strong>RMIT–Support</strong> is the temporary network available to first time users of the RMIT community. This ‘open access’ network will appear in the wifi settings of any device you may choose to work on.</li>
				</ul>
				</li>
				<li>Entering your RMIT ID and password.</li>
				</ol>
				<p>For more information about how to get connected see <a href="https://community.its.rmit.edu.au/t5/IT-Knowledge-Base/Getting-Connected-at-RMIT/ba-p/1270">Getting Connected at R</a><a href="https://community.its.rmit.edu.au/t5/IT-Knowledge-Base/Getting-Connected-at-RMIT/ba-p/1270">MIT</a>. It contains step-by-step instructions explaining how to gain access to the RMIT wireless networks, no matter which mobile device or laptop you bring on campus..<br>
				</p>
            </div>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h4 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">Printing</a>
            </h4>
        </div>
        <div id="collapseTwo" class="panel-collapse collapse">
            <div class="panel-body">
				<p>Follow these steps and it’s done:</p>
					<ol>
					<li><a href="https://community.its.rmit.edu.au/t5/IT-Knowledge-Base/Printing-at-RMIT/ba-p/1257">Send your document</a> to be printed (use myDesktop if you are printing from your own device)<br>
					</li>
					<li>Go to a Ricoh multi-function device<br>
					</li>
					<li><a href="https://community.its.rmit.edu.au/t5/IT-Knowledge-Base/How-to-register-your-RMIT-ID-card-for-Printing/ba-p/1211">Register</a> your card. Already registered? Go to step 4.<br>
					</li>
					<li>Swipe your student card on the printer and print.<br>
					</li>
					</ol>
					<p>Please note: You can still print without your student card. Check out <a href="https://community.its.rmit.edu.au/t5/IT-Knowledge-Base/Printing-without-a-Student-Card/ba-p/1255">Printing without a Student Card</a>.<br>
					</p>
					<p>When you print, you have 12 hours to collect it from a printer. Print jobs are automatically deleted from the print queue after this time.<br>

            </div>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h4 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">Accessing Email</a>
            </h4>
        </div>
        <div id="collapseThree" class="panel-collapse collapse">
            <div class="panel-body">
				<p>You can access your RMIT email account via the Gmail login page: <a href="https://mail.google.com">mail.google.com</a>.</p>
				<h3>Logging In</h3>
				<p><strong>Username</strong></p>
				<p>Your Google username is your student number followed by @student.rmit.edu.au</p>
				<p>For example: s1234567@student.rmit.edu.au</p>
				<p><strong>Password</strong></p>
				<p>Your default Google password is the letter ‘p’ followed by your date of birth backwards with an exclamation mark ‘!’ at the end</p>
				<p>For example: 28 April 1995 is p19950428!</p>
				<p><strong><u>Remember:</u></strong> Don’t check ‘Stay signed in’ when accessing from a public or shared computer. If you have any difficulties logging in, contact the <a href="/content/rmit-ui/en/students/support-and-facilities/it-services-for-students/service-and-support-centre.html">Service and Support Centre</a>.</p>
		    </div>
        </div>
    </div>
</div>


			</div>
		</div>
	</div>
@stop
