import React from 'react'
import {DropDownMenu, MenuItem, RaisedButton, SelectField, TextField} from "material-ui";

const styles = {
    column1: {
        position: "absolute",
        display: "inline-block",
        verticalAlign: "center",
        textAlign: "center"
    },
    div: {
        textAlign: "center",
        paddingTop: 10,
        width: "100%"
    },
    button : {
        marginTop: 5,
        marginBottom: 5
    },
    select: {
        width: "100%"
    }

};

const assignedtoMenuItems = [];

export default class TicketPanel extends React.Component {

    constructor(props) {
		super(props);
        this.state = {
            user: localStorage.getItem('Name'),
            ticketData: {
                id: '',
                issueTitle: '',
                os: '',
                status: '',
                description: '',
                priority: '',
                escalation: '',
                assignedto: {
                    id: '',
                    displayName: ''
                },

            },
            messages : [],
            techUsers: {
                id: '',
            displayName:''
            }
        }

        //Retrieves ticket data
        this.getTicketData();
        //Retrieves the assigned tech users data
        this.getTechUsers();
	}

    componentWillMount()
    {
        if (!localStorage.getItem('User'))
        {
            this.props.history.push("/login");
            return ;
        }
    }

    //Retrieves ticket data
    getTicketData()
    {
        //Api url
        var url = 'http://localhost/WebDBAss2/webfiles/public/api/tickets/returnTicket/' + this.props.ticketID;
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
            this.setState(function(prevState,props) {
                return {ticketData: data[0]}
            });

            console.log(data);
            this.setState({...this.state.ticketData, assignedto: this.state.ticketData.assignedto})

        }.bind(this))
    }

    getTechUsers()
    {
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

    //Sets the current ticket status to resolved
    resolveTicket =() => {
        this.setState({ticketData:{...this.state.ticketData, status:'Resolved'}});
		var url = 'http://localhost/WebDBAss2/webfiles/public/api/tickets/statusupdate/'+ this.props.ticketID + '/Resolved';
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;',
            }
        });
	}

    //Sets the current tickts status to unresolved
    unresolveTicket =() => {
        this.setState({ticketData:{...this.state.ticketData, status:'Unresolved'}});
        var url = 'http://localhost/WebDBAss2/webfiles/public/api/tickets/statusupdate/'+ this.props.ticketID + '/Unresolved';
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;',
            }
        });
    }

    //Changes ticket priority
    priorityChanged = (event, index, value) => {
        console.log("Before P", this.state.ticketData);
        var url= 'http://localhost/WebDBAss2/webfiles/public/api/tickets/priorityupdate/' + this.props.ticketID + '/' + value;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;',
            }
        });
        this.setState({ticketData:{...this.state.ticketData, priority:value}});
        console.log("After P", this.state.ticketData);
	};

    //Changes tickets escalation level
    escalationChanged = (event, index, value) => {
        console.log("Before E", this.state.ticketData);
        var url= 'http://localhost/WebDBAss2/webfiles/public/api/tickets/escalationupdate/' + this.props.ticketID + '/' + value;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;',
            }
        });
        this.setState({ticketData:{...this.state.ticketData, escalation:value}});
        console.log("After E", this.state.ticketData);
	};

    //Sets who the ticket is assigned to
    assignedToChanged = (event, index, value) => {
        console.log("Before A", this.state.ticketData);
        var url= 'http://localhost/WebDBAss2/webfiles/public/api/tickets/assignTicket/' + this.props.ticketID + '/' + value.id;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;',
            }
        });
        this.setState({ticketData:{...this.state.ticketData, assignedto:value}});
        console.log("After A", this.state.ticketData);
	};

    handleChange = (event, index, value) => {
        var fieldName = event.target.name;
        console.log("event.target.name:" + event.target.name + ", event.target.value:" + value);
        this.setState({ticketData:{...this.state.ticketData,fieldName:value}});
    };

    render() {
        console.log("STATE:", this.state)
            return (
					<div>
                        <h2>{this.state.ticketData.issueTitle}</h2>
                        <h2>Status: {this.state.ticketData.status}</h2>
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
                            <DropDownMenu
                                name="priority"
                                value={this.state.ticketData.priority}
                                style={styles.select}
                                onChange={this.priorityChanged}
                            >
                                <MenuItem value="low" key="low" primaryText="Low"/>
                                <MenuItem value="medium" key="medium" primaryText="Medium"/>
                                <MenuItem value="high" key="high" primaryText="High"/>
                            </DropDownMenu>
							<br/>
							<DropDownMenu
                                name="escalation"
								value={this.state.ticketData.escalation}
                                style={styles.select}
                                onChange={this.escalationChanged}
							>
								<MenuItem value="1" key="1" primaryText="1"/>
								<MenuItem value="2" key="2" primaryText="2"/>
								<MenuItem value="3" key="3" primaryText="3"/>
							</DropDownMenu>
							<br/>
							<DropDownMenu
                                name="assignedto"
								value={this.state.ticketData.assignedto}
                                style={styles.select}
								onChange={this.assignedToChanged}
							>
                                {assignedtoMenuItems}
							</DropDownMenu>
							<br/>
							<RaisedButton label="Resolve" onClick={this.resolveTicket} primary={true} fullWidth={true} style={styles.button}/>
							<br/>
							<RaisedButton label="Unresolve" onClick={this.unresolveTicket} secondary={true} fullWidth={true} style={styles.button}/>
						</form>
					</div>
        )
    }
}
