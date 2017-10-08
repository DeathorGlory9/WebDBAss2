import React from 'react'
import {Card, CardActions, CardHeader, CardText, TextField} from "material-ui";
import TinyMCE from 'react-tinymce';
import { ChatFeed, Message } from 'react-chat-ui';
import Paper from "material-ui/Paper"

var commentValue = "";

// const test = match.params.id;


const styles = {
    leftCard: {
		//float: 'left',
		//display: "inline-block",
        margin: "10%",
        padding: 10,
		textAlign: "Center"
    },
    rightCard: {
        //float: 'right',
        //display: "inline-block",
		margin: "10%",
		padding: 10
    }
}

export default class Ticket extends React.Component {

	constructor() {
		super();
		this.state = {
            user: localStorage.getItem('Name'),
            ticketData: [],
            messages : []
        };
	}

    componentWillMount()
    {
        if (!localStorage.getItem('User'))
        {
            this.props.history.push("/login");
            return ;
        }

        this.getTicketData();

		this.getCommentData();

    }

    handleEditorChange = (e) => {
            commentValue = e.target.getContent();
      }

    getCommentData() {

 		var url = 'http://localhost/WebDBAss2/webfiles/public/api/comments/get/' + this.props.match.params.id;

		var temp = [];
		fetch(url)
			.then(response => response.json())
			.then(json => {
				var tmpMessage;
				var arrayvar = this.state.messages.slice();
				var i

				for(const ele in json)
				{

					if (json[ele]['author'] == this.state.user)
						{i = 0;}
					else
						{i = 1;}

					tmpMessage = (new Message({ id: i, message: json[ele]['comment'], senderName: json[ele]['author']}));
					arrayvar.push(tmpMessage);
				};

				this.setState(
				{
					messages: arrayvar
				});
		   })
    }

	 getTicketData() {
        var url = 'http://localhost/WebDBAss2/webfiles/public/api/tickets/returnTicket/' + this.props.match.params.id;
        fetch(url)
            .then(response => {response.json();
	 })
            .then(data => {
                // let ticketData = data.results.map((ticket) => {
            		// return(
            		// 	<div key={ticket.results}>
				// 			{ticket.ticketData.id}
				// 		</div>
				// 	)
				// });
                this.setState({ticketData: data});
                console.log("STATE:", this.state.ticketData);
            })

    }

	 submitComment(e)
	 {
		  var author = this.state.user;
		  var comment =  commentValue.replace(/<[^>]*>/g, '');
		  comment = comment.replace(/[^a-zA-Z ]/g, "");
		  var url = 'http://localhost/WebDBAss2/webfiles/public/api/comments/add/' + this.props.match.params.id + '/' + comment + '/' + author;

		  fetch(url);

		  var tmpMessage;
		  var arrayvar = this.state.messages.slice();
		  tmpMessage = (new Message({ id: 0, message: comment, senderName: author}));
		  arrayvar.push(tmpMessage);
		  this.setState({
			  messages: arrayvar
		  });
	 }

    render() {
            return (
			<div>
            	<Paper style={styles.leftCard}>

                        <h2>{this.state.ticketData}</h2>

                        <br/>
                        <TextField
                            hintText="Hint Text"
                            floatingLabelText="Floating Label Text"
                        />
                        <br/>
                        <TextField
                            hintText="Hint Text"
                            floatingLabelText="Floating Label Text"
                        />
                        <br/>
                </Paper>
                <Paper style={styles.rightCard}>
                    <h1>
                        Ticket Comments
                    </h1>
                    <div>
						  <ChatFeed
							 messages={this.state.messages} // Boolean: list of message objects
							 hasInputField={false} // Boolean: use our input, or use your own
							 showSenderName // show the name of the user who sent the message
							 bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
							 // JSON: Custom bubble styles
							 bubbleStyles={
								{
								  text: {
									 fontSize: 14
								  },
								  chatbubble: {
									 borderRadius: 10,
									 padding: 10
								  }
								}
							 }
						  />
                    </div>
                    <div>
            		  <TinyMCE
            			 content="<p>Insert comment here.</p>"
            			 config={{
            				plugins: 'link image code',
            				toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
            				statusbar: false,
                            allow_html_in_named_anchor: false,
            				menubar: false
            			 }}
            			 onChange={this.handleEditorChange}
            		  />
                      <button onClick={this.submitComment.bind(this)}>Submit Comment</button>
                    </div>
				</Paper>
			</div>
        )
    }
}


