import React from 'react'
import {Card, CardActions, CardHeader, CardText, TextField} from "material-ui";
import TinyMCE from 'react-tinymce';

var commentValue = "";
var ticketID = 1;

export default class Ticket extends React.Component {

    componentWillMount()
    {
        if (!localStorage.getItem('User'))
        {
            this.props.history.push("/login");
            return ;
        }
    }

    handleEditorChange = (e) => {
            commentValue = e.target.getContent();
      }

      submitComment()
      {
          var author = "admin";
          var comment =  commentValue.replace(/<[^>]*>/g, '');
          comment = comment.replace(/[^a-zA-Z ]/g, "");
          var url = 'http://localhost/WebDBAss2/webfiles/public/api/comments/add/' + ticketID + '/' + comment + '/' + author;

          fetch(url);
      }

    render() {
            return (
            <div>
                <Card style={styles.leftCard}>
                    <CardHeader>
                        Ticket
                    </CardHeader>
                    <CardText>
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
                      <button onClick={this.submitComment}>Submit Comment</button>
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
