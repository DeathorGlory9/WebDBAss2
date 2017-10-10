import React from 'react'
import { ChatFeed, Message } from 'react-chat-ui';
import 'whatwg-fetch';
import Paper from "material-ui/Paper";
import TinyMCE from 'react-tinymce';
import {RaisedButton} from "material-ui";

var commentValue = "";

const styles = {
    buttonDiv:{
        float:"right",
        marginTop: 15
    },
    chatBubbles:{
        maxHeight: 350,
        overflowY: "scroll"

    }
}

export default class CommentPanel extends React.Component {
    constructor(props) {
		super();

        super(props);

		this.state = {
            messages : [],
            user : localStorage.getItem('Name')
        };
	}

    componentWillMount()
    {
        //Gets the ticket data
        this.getCommentData();
    }

    getCommentData() {
        //Api url
 		var url = 'http://localhost/WebDBAss2/webfiles/public/api/comments/get/' + this.props.ticketID;

		var temp = [];
        //Gets ticket data
		fetch(url)
			.then(response => response.json())
			.then(json => {
				var tmpMessage;
				var arrayvar = this.state.messages.slice();
				var i
                //Creates a message to display for each comment
				for(const ele in json)
				{
                    //Checks if the currently logged in user is the commenter
					if (json[ele]['author'] == this.state.user)
						{i = 0;}
					else
						{i = 1;}
                    //Adds the message to an array
					tmpMessage = (new Message({ id: i, message: json[ele]['comment'], senderName: json[ele]['author']}));
					arrayvar.push(tmpMessage);
				};

				this.setState(
				{
					messages: arrayvar
				});
		   })
    }

    //Adds a new comment
    submitComment(e)
    {
        //Gets the current users name
        var author = localStorage.getItem('Name');
        //Removes specical characters from the comment
        var comment =  commentValue.replace(/<[^>]*>/g, '');
        comment = comment.replace(/[^a-zA-Z ]/g, "");
        //Api url
        var url = 'http://localhost/WebDBAss2/webfiles/public/api/comments/add/' + this.props.ticketID + '/' + comment + '/' + author;
        //Makes request
        fetch(url, {
            method: 'POST',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'multipart/form-data;',
        }
        });

        //Adds the message to the comment section
        var tmpMessage;
        var arrayvar = this.state.messages.slice();
        tmpMessage = (new Message({ id: 0, message: comment, senderName: author}));
        arrayvar.push(tmpMessage);
        this.setState({
            messages: arrayvar,
        });
    }

    //Submit comment listener
    handleEditorChange = (e) =>{
        commentValue = e.target.getContent();
    };

    render()
    {
        return(
            <div>
                <h1>
                    Ticket Comments - {this.state.user}
                </h1>
                <div style={styles.chatBubbles}>
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
                    ref = "commentEditor"
                     content= ""
                     config={{
                        plugins: 'link image code',
                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
                        statusbar: false,
                        allow_html_in_named_anchor: false,
                        menubar: false
                     }}
                     onChange={this.handleEditorChange}
                  />
                  <RaisedButton label="Submit Comment" style={styles.buttonDiv} onClick={this.submitComment.bind(this)} primary={true}/>
                </div>
</div>
        )
    }
}
