import React from 'react'
import {RaisedButton, SelectField, TextField} from "material-ui";
import TinyMCE from 'react-tinymce';
import { ChatFeed, Message } from 'react-chat-ui';
import Paper from "material-ui/Paper";
import 'whatwg-fetch';

var commentValue = "";

// const test = match.params.id;


const styles = {
    leftCard: {
		//float: 'left',
		display: "inline-block",
        margin: 10,
        padding: 10,
		textAlign: "Center",
        verticalAlign: "top",
		height: 670,
		width: "30%"
    },
    rightCard: {
        //float: 'right',
        display: "inline-block",
		margin: 10,
		padding: 10,
		verticalAlign: "top",
        height: 670,
		width: "50%"
    },
    column1: {
        position: "absolute",
        display: "inline-block",
		verticalAlign: "center",
		textAlign: "center"
        //margin: "%",
        //padding: 10
	},
	div: {
    	textAlign: "center",
		paddingTop: 10,
		width: "100%"
	},
	button : {
		marginTop: 5,
		marginBottom: 5
	}
}

export default class Ticket extends React.Component {

	constructor() {
		super();
		this.state = {
            user: localStorage.getItem('Name'),
            ticketData: {},
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
		var url = 'http://localhost/WebDBAss2/webfiles/public/api/tickets/returnTicket/' + this.props.match.params.id ;
        var Ticket = {};
        fetch(url, {
            method: 'GET',
        })

            .then(function(response ) {
            return response.json();
			})
            .then(function(data) {
                console.log(data);
                Ticket = data[0];
                console.log("DATA 0:", data[0]);
                this.setState({ticketData: Ticket})

			}.bind(this))

    }

	 submitComment(e)
	 {
		  var author = localStorage.getItem('Name');
		  var comment =  commentValue.replace(/<[^>]*>/g, '');
		  comment = comment.replace(/[^a-zA-Z ]/g, "");
		  var url = 'http://localhost/WebDBAss2/webfiles/public/api/comments/add/' + this.props.match.params.id + '/' + comment + '/' + author;

		  fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;',
            }
          });

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
			<div style={styles.div}>
            	<Paper style={styles.leftCard}>

                        <h2>{this.state.ticketData.issueTitle}</h2>
						<h2>Status: {this.state.ticketData.status}</h2>
					<div>
							<TextField
                            floatingLabelText="ID"
							value={this.state.ticketData.id}
                        	/>
						<br/>
                        <TextField
                            floatingLabelText="Operating System"
							value={this.state.ticketData.os}
                        />
                        <br/>
						<TextField
							floatingLabelText="Description"
							value={this.state.ticketData.description}
						/>
						<br/>
						<TextField
							floatingLabelText="Priority"
							value={this.state.ticketData.priority}
						/>
						<br/>
						<TextField
							floatingLabelText="Escalation"
							value={this.state.ticketData.escalation}
						/>
						<br/>
						<SelectField
							floatingLabelText="Assigned To"
							value={this.state.ticketData.assignedto}
							style={styles.select}
						/>
						<br/>
						<RaisedButton label="Resolve" primary={true} fullWidth={true} style={styles.button}></RaisedButton>
						<br/>
						<RaisedButton label="Unresolve" secondary={true} fullWidth={true} style={styles.button}></RaisedButton>
					</div>
                </Paper>
                <Paper style={styles.rightCard}>
                    <h1>
                        Ticket Comments - {this.state.user}
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
