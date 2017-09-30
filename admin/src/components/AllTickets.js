import React from 'react';
import {RaisedButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui";
import {TicketTable} from './TicketTable';


const appTokenKey = "appToken";


const tableData = [
    {
        id: 'UID1',
        issueTitle: 'Fire',
		os: 'iOS',
		description: 'My computer is on fire. Please send help.',
        status: 'Pending',
		priority: '1',
		escalation: '1',
		assignedTo: 'Bob'

    },
    {
        id: 'UID2',
        issueTitle: 'Computer is blank',
        os: 'iOS',
        description: 'Do i need the cable to be plugged in?',
        status: 'Pending',
        priority: '1',
        escalation: '1',
        assignedTo: 'Bob'
    }];

export default class Home extends React.Component
{
	componentWillMount()
	{
		if (!localStorage.getItem('User'))
		{
			this.props.history.push("/login");
			return;
		}
	}

	render()
	{
		return <TicketTable/>;
	}
}
