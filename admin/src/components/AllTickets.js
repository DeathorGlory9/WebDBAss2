import React from 'react';
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
