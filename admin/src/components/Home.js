import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui";
import {TicketTable} from "./TicketTable";

const appTokenKey = "appToken";

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
	  <TicketTable assignedTo={localStorage.getItem('id')}/>
  </div>
)
