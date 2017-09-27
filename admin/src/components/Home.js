import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui";


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
		return <HomePage/>;
	}
}

const HomePage = () => (
  <div>
    <h1>Home page</h1>
	{ localStorage.getItem('User') }
	  <span><h2>My Tickets</h2></span>
	  <Table>
		  <TableHeader>
			  <TableRow>
				  <TableHeaderColumn>Id</TableHeaderColumn>
				  <TableHeaderColumn>issue Title</TableHeaderColumn>
				  <TableHeaderColumn>Operating System</TableHeaderColumn>
				  <TableHeaderColumn>Description</TableHeaderColumn>
				  <TableHeaderColumn>Status</TableHeaderColumn>
				  <TableHeaderColumn>Priority</TableHeaderColumn>
				  <TableHeaderColumn>Escalation</TableHeaderColumn>
				  <TableHeaderColumn>Assigned To</TableHeaderColumn>
			  </TableRow>
		  </TableHeader>
		  <TableBody>
			  {tableData.map((row, index) => (<TableRow key={index}>
				  <TableRowColumn>{row.id}</TableRowColumn>
				  <TableRowColumn>{row.issueTitle}</TableRowColumn>
				  <TableRowColumn>{row.os}</TableRowColumn>
				  <TableRowColumn>{row.description}</TableRowColumn>
				  <TableRowColumn>{row.status}</TableRowColumn>
				  <TableRowColumn>{row.priority}</TableRowColumn>
				  <TableRowColumn>{row.escalation}</TableRowColumn>
				  <TableRowColumn>{row.assignedTo}</TableRowColumn>
			  </TableRow>))}
		  </TableBody>
	  </Table>
  </div>
)
