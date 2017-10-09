/**
 * Created by meaganc on 9/10/17.
 */
import React from 'react'
import {MenuItem, RaisedButton, SelectField, TextField} from "material-ui";
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
        height: 670
    },
    rightCard: {
        //float: 'right',
        display: "inline-block",
        margin: 10,
        padding: 10,
        verticalAlign: "top",
        height: 670
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
        paddingTop: 10
    },
    button : {
        marginTop: 5,
        marginBottom: 5
    }
}

export default class CreateTicket extends React.Component {

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

        }

    }



    handleSubmit() {
        var form = document.querySelector('form')

        fetch('http://localhost/WebDBAss2/webfiles/public/api/tickets/createTicket', {
            method: 'POST',
            body: new FormData(form)
        }).then(function () {
            this.props.router.push('/home');
        })
    }

    render() {
        return (
            <div style={styles.div}>
                <Paper style={styles.leftCard}>

                    <h2>New Ticket</h2>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                        <TextField
                            floatingLabelText="Issue Title"
                            name="issueTitle"
                        />
                        <br/>
                        <SelectField
                            floatingLabelText="Operating System"
                            name="os"
                        >
                            <MenuItem value="iOS" primaryText="iOS"/>
                            <MenuItem value="Windows" primaryText="Windows"/>
                            <MenuItem value="Linux" primaryText="Linux"/>
                        </SelectField>
                        <br/>
                        <TextField
                            floatingLabelText="Description"
                            name="description"

                        />
                        <br/>
                        <SelectField
                            floatingLabelText="Priority"
                            name="priority"

                        >
                            <MenuItem value="Low" primaryText="Low"/>
                            <MenuItem value="Medium" primaryText="Medium"/>
                            <MenuItem value="High" primaryText="High"/>
                        </SelectField>

                        <br/>
                        <SelectField
                            floatingLabelText="Escalation"
                            name="escalation"

                        >
                            <MenuItem value="1" primaryText="1"/>
                            <MenuItem value="2" primaryText="2"/>
                            <MenuItem value="3" primaryText="3"/>
                        </SelectField>
                        <br/>
                        <SelectField
                            floatingLabelText="Assigned To"
                            name="assignedto"
                            style={styles.select}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} fullWidth={true} style={styles.button} type="submit"/>
                        </form>
                    </div>
                </Paper>

            </div>
        )
    }
}


