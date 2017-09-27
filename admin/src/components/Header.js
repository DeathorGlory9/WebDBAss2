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

const RightMenuButtons = () => (
	<div>
		<FlatButton href='/' label="Home"/>
		<FlatButton href='/Login' label="View All Tickets"/>
		<FlatButton href='/Login' label="View Ticket"/>
		<FlatButton href='/logout' label="Logout"/>
	</div>
);

// The Header creates links that can be used to navigate
// between routes.
const HeaderSection = () => (
	<header>
		<AppBar
		title="Helpdesk Portal"
		iconElementRight={<RightMenuButtons/>}/>
	</header>
);
