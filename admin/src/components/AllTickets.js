import React from 'react';
import {RaisedButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui";
import {TicketTable} from './TicketTable';


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
		return (
			<div>
				<TicketTable/>
			</div>
			)
	}
}
