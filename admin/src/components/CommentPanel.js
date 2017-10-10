import React from 'react'
import { ChatFeed, Message } from 'react-chat-ui';
import 'whatwg-fetch';
import Paper from "material-ui/Paper";
import TinyMCE from 'react-tinymce';

var commentValue = "";

const styles = {
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
        this.getCommentData();
    }

    getCommentData() {

 		var url = 'http://localhost/WebDBAss2/webfiles/public/api/comments/get/' + this.props.ticketID;

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

    submitComment(e)
    {
         var author = localStorage.getItem('Name');
         var comment =  commentValue.replace(/<[^>]*>/g, '');
         comment = comment.replace(/[^a-zA-Z ]/g, "");
         var url = 'http://localhost/WebDBAss2/webfiles/public/api/comments/add/' + this.props.ticketID + '/' + comment + '/' + author;

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

    handleEditorChange = (e) =>{
        commentValue = e.target.getContent();
    }

    render()
    {
        return(
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
                     content=""
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
        )
    }
}
