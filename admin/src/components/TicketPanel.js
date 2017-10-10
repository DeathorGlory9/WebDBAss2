import React from 'react'
import {DropDownMenu, MenuItem, RaisedButton, SelectField, TextField} from "material-ui";

const styles = {
    column1: {
        position: "absolute",
        display: "inline-block",
        verticalAlign: "center",
        textAlign: "center"
    },
    h2: {
        textAlign: "left",
        paddingLeft: 20
    },
    p: {
        textAlign: "left",
        paddingLeft: 20
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
        width: "100%",
        textAlign: "left"
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
                assignedto: '',

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
            return true;
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
            TechUsers = data;

            this.setState({techUsers: TechUsers});

            this.state.techUsers.forEach(function(User) {
                assignedtoMenuItems.push(<MenuItem value={User.id} label={User.id} key={User.id} primaryText={User.id}/>);
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

    //Sets the current tickets status to unresolved
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

        var url= 'http://localhost/WebDBAss2/webfiles/public/api/tickets/priorityupdate/' + this.props.ticketID + '/' + value;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;',
            }
        });
        this.setState({ticketData:{...this.state.ticketData, priority:value}});

	};

    //Changes tickets escalation level
    escalationChanged = (event, index, value) => {

        var url= 'http://localhost/WebDBAss2/webfiles/public/api/tickets/escalationupdate/' + this.props.ticketID + '/' + value;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;',
            }
        });
        this.setState({ticketData:{...this.state.ticketData, escalation:value}});

	};

    //Sets who the ticket is assigned to
    assignedToChanged = (event, index, value) => {

        var url= 'http://localhost/WebDBAss2/webfiles/public/api/tickets/assignTicket/' + this.props.ticketID + '/' + value.id;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;',
            }
        });
        this.setState({ticketData:{...this.state.ticketData, assignedto:value}});

	};

    handleChange = (event, index, value) => {
        var fieldName = event.target.name;
        console.log("event.target.name:" + event.target.name + ", event.target.value:" + value);
        this.setState({ticketData:{...this.state.ticketData,fieldName:value}});
    };

    render() {

            return (
					<div>
                        <h2  style={styles.h2}>{this.state.ticketData.issueTitle}</h2>
                        <h2  style={styles.h2}>Status: {this.state.ticketData.status}</h2>
						<form>
                            <p style={styles.p}>ID: {this.state.ticketData.id}</p>
				            <p style={styles.p}>Operating System: {this.state.ticketData.os}</p>
		                    <p style={styles.p}>Description:<br/> {this.state.ticketData.description}</p>
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
								<MenuItem value={1} key="1" primaryText="1"/>
								<MenuItem value={2} key="2" primaryText="2"/>
								<MenuItem value={3} key="3" primaryText="3"/>
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
