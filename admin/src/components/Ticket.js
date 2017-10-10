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
};

const assignedtoMenuItems = [];

export default class Ticket extends React.Component {

	constructor() {
		super();
		this.state = {
            user: localStorage.getItem('Name'),
            ticketData: {},
            messages : [],
			techUsers: [],
        }
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

                Ticket = data[0];

                this.setState({ticketData: Ticket});

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
                this.setState({techUsers: TechUsers});

                this.state.techUsers.forEach(function(User) {
                    assignedtoMenuItems.push(<MenuItem value={User} label={User.displayName} key={User.id} primaryText={User.displayName}/>);
                });
            }.bind(this))


    }

    assignedToChanged = (event, index, value) => {
		this.setState({ticketData:{assignedto:value}});
		var url= 'http://localhost/WebDBAss2/webfiles/public/api/tickets/statusupdate/' + this.props.match.params.id + '/' + value;

		fetch(url, {
			method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;',
            }
		});
	};

    handleChange = (event, index, value) => {
        var FieldName = event.target.name;
        console.log("event.target.name:" + event.target.name + ", event.target.value:" + value);
        this.setState({ticketData:{[FieldName]: value}});
    };

    render() {
            return (
			<div style={styles.div}>
            	<Paper style={styles.leftCard}>

                        <h2>{this.state.ticketData.issueTitle}</h2>
						<h2>Status: {this.state.ticketData.status}</h2>
					<div>
						<form>
							<TextField
								floatingLabelText="ID"
								name="id"
								floatingLabelFixed={true}
								value={this.state.ticketData.id}
								onChange={this.handleChange}
							/>
							<br/>
							<TextField
								floatingLabelText="Operating System"
								name="os"
								floatingLabelFixed={true}
								value={this.state.ticketData.os}
								onChange={this.handleChange}
							/>
							<br/>
							<TextField
								floatingLabelText="Description"
								name="description"
								floatingLabelFixed={true}
								value={this.state.ticketData.description}
								onChange={this.handleChange}
							/>
							<br/>
							<TextField
								floatingLabelText="Priority"
								name="priority"
								floatingLabelFixed={true}
								value={this.state.ticketData.priority}
								onChange={this.handleChange}
							/>
							<br/>
							<SelectField
								floatingLabelText="Escalation"
								name="escalation"
								value={this.state.ticketData.escalation}
								onChange={this.handleChange}
							>
								<MenuItem value="1" key="1" primaryText="1"/>
								<MenuItem value="2" key="2" primaryText="2"/>
								<MenuItem value="3" key="3" primaryText="3"/>
							</SelectField>
							<br/>
							<SelectField
								floatingLabelText="Assigned To"
								name="assignedto"
								value={this.state.ticketData.assignedto}
								style={styles.select}
								onChange={this.assignedToChanged}
							>
                                {assignedtoMenuItems}
							</SelectField>
							<br/>
							<RaisedButton label="Resolve" primary={true} fullWidth={true} style={styles.button}/>
							<br/>
							<RaisedButton label="Unresolve" secondary={true} fullWidth={true} style={styles.button}/>
						</form>
					</div>
                </Paper>
				<Paper style={styles.rightCard}>
                <CommentPanel ticketID={this.props.match.params.id}/>
				</Paper>
			</div>
        )
    }
}
