import React from 'react'
import {MenuItem, RaisedButton, SelectField, TextField} from "material-ui";
import Paper from "material-ui/Paper";
import CommentPanel from "./CommentPanel";

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

const assignedtoMenuItems = [];

export default class Ticket extends React.Component {

	constructor() {
		super();
		this.state = {
            user: localStorage.getItem('Name'),
            ticketData: {},
            messages : [],
			techUsers: [],
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

		this.getTechUsers();

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

    getTechUsers() {
        var url = 'http://localhost/WebDBAss2/webfiles/public/api/techusers/getAllTechUsers';
        var TechUsers = [];
        fetch(url, {
            method: 'GET',
        })

            .then(function(response ) {
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                TechUsers = data;
                console.log("TECH:", data);
                this.setState({techUsers: TechUsers})

				this.state.techUsers.forEach(function(User) {
					assignedtoMenuItems.push(<MenuItem value={User} key={User} primaryText={User.displayName}/>);
				})
            }.bind(this))

    }

    assignedtoChanged = (event, index, value) => {
		this.setState({ticketData:{assignedto:value}});
		var url= 'http://localhost/WebDBAss2/webfiles/public/api/tickets/statusupdate/' + this.props.match.params.id + '/' + value;

		fetch(url, {
			method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;',
            }
		});
	}

    escalationChanged = (event, index, value) => this.setState({ticketData:{escalation:value}});

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
						<SelectField
							floatingLabelText="Escalation"
							value={this.state.ticketData.escalation}
							onChange={this.escalationChanged}
						>
							<MenuItem value="1" primaryText="1"/>
							<MenuItem value="2" primaryText="2"/>
							<MenuItem value="3" primaryText="3"/>
						</SelectField>
						<br/>
						<SelectField
							floatingLabelText="Assigned To"
							value={this.state.ticketData.assignedto}
							style={styles.select}
							onChange={this.assignedtoChanged}
						>
							{assignedtoMenuItems}
						</SelectField>
						<br/>
						<RaisedButton label="Resolve" primary={true} fullWidth={true} style={styles.button}></RaisedButton>
						<br/>
						<RaisedButton label="Unresolve" secondary={true} fullWidth={true} style={styles.button}></RaisedButton>
					</div>
                </Paper>
                <CommentPanel ticketID={this.props.match.params.id}/>
			</div>
        )
    }
}
