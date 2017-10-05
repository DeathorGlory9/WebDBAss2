import React from 'react'
import {Card, CardActions, CardHeader, CardText, TextField} from "material-ui";
import TinyMCE from 'react-tinymce';
import { ChatFeed, Message } from 'react-chat-ui'

var commentValue = "";
var ticketID = 1;

export default class Ticket extends React.Component {

	state = {
		 ticketData: [],
		 messages : [
		 ],
	};

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
 		var url = 'http://localhost/WebDBAss2/webfiles/public/api/comments/get/' + ticketID;

		var temp = [];
		fetch(url)
			.then(response => response.json())
			.then(json => {
				var tmpMessage;
				var arrayvar = this.state.messages.slice();
				var i = 0;
				for(const ele in json) {
					tmpMessage = (new Message({ id: i, message: json[ele]['comment']}));
					arrayvar.push(tmpMessage);
					i++;
				};

				this.setState({
					messages: arrayvar
				});
		   })
    }

	 getTicketData() {
        var url = 'http://localhost/WebDBAss2/webfiles/public/api/tickets/returnTicket/' + ticketID;
        fetch(url)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    ticketData: json
                });
            })
    }

	 submitComment(e)
	 {
		  var author = "admin";
		  var comment =  commentValue.replace(/<[^>]*>/g, '');
		  comment = comment.replace(/[^a-zA-Z ]/g, "");
		  var url = 'http://localhost/WebDBAss2/webfiles/public/api/comments/add/' + ticketID + '/' + comment + '/' + author;

		  fetch(url);

		  var tmpMessage;
		  var arrayvar = this.state.messages.slice();
		  tmpMessage = (new Message({ id: 0, message: comment}));
		  arrayvar.push(tmpMessage);
		  this.setState({
			  messages: arrayvar
		  });
	 }

    render() {
            return (

            <div>
                <Card style={styles.leftCard}>
                    <CardHeader>
                        Ticket
                    </CardHeader>
                    <CardText>
                        <p>{this.state.ticketData.id}</p>
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

                    </CardText>
                    <CardActions>

                    </CardActions>
                </Card>
                <Card style={styles.rightCard}>
                    <CardHeader>
                        Ticket Comments
                    </CardHeader>
                    <CardText>
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
									 borderRadius: 70,
									 padding: 10
								  }
								}
							 }
						  />
                    </CardText>
                    <CardActions>
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
                    </CardActions>
                </Card>
            </div>
        )
    }
}

const styles = {
    leftCard: {
        float: 'left'
    },
    rightCard: {
        float: 'right'
    }
}

// const TicketCard = () => (
//
// );
