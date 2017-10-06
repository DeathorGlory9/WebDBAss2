import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

export default class Header extends React.Component
{
	render()
	{
		return <HeaderSection/>;
	}
}

// The Header creates links that can be used to navigate
// between routes.
const HeaderSection = () => (
	<header>
		<AppBar
		title="Helpdesk Portal"
		iconElementRight={<RightMenuButtons/>}/>
	</header>
);

const RightMenuButtons = () => (
	<div>
		<FlatButton href='/' label="Home"/>
		<FlatButton href='/viewAllTickets' label="View All Tickets"/>
		<FlatButton href='/ticket/{id}' label="View Ticket"/>
		<FlatButton href='/logout' label="Logout"/>
	</div>
);
