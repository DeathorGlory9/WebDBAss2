import React from 'react'
import Paper from "material-ui/Paper";
import TicketPanel from "./TicketPanel";
import CommentPanel from "./CommentPanel";
import {DropDownMenu, MenuItem, RaisedButton, SelectField, TextField} from "material-ui";

const assignedtoMenuItems = [];

const styles = {
    leftCard: {
        display: "inline-block",
        margin: 10,
        padding: 10,
        textAlign: "Center",
        verticalAlign: "top",
        height: 670,
        width: "30%"
    },
    rightCard: {
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

export default class TicketPage extends React.Component {

    constructor() {
		super();
	}

    componentWillMount()
    {
        if (!localStorage.getItem('User'))
        {
            this.props.history.push("/login");
            return ;
        }
        //Retrieves ticket data
        this.getTicketData();
        //Retrieves the assigned tech users data
		this.getTechUsers();

    }

    //Retrieves ticket data
    getTicketData()
    {
        //Api url
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

    render() {
        if (localStorage.getItem('User') == "helpdesk")
        {
            return (
    			<div style={styles.div}>
                	<Paper style={styles.leftCard}>
                        <TicketPanel ticketID={this.props.match.params.id}/>
                    </Paper>
    			</div>
            )
        }
        else
        {
            return (
    			<div style={styles.div}>
                	<Paper style={styles.leftCard}>
                        <TicketPanel ticketID={this.props.match.params.id}/>
                    </Paper>
    				<Paper style={styles.rightCard}>
                        <CommentPanel ticketID={this.props.match.params.id}/>
    				</Paper>
    			</div>
            )
        }
    }
}
