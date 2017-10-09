import React from 'react'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const style = {
    button: {
        color: "#FFF",
        verticalAlign: "Center",
    },
    div : {
        verticalAlign: "Center"
    }
}

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
	<div style={style.div}>
		<FlatButton style={style.button} href='/' label="Home"/>
		<FlatButton style={style.button} href='/logout' label="Logout"/>
	</div>
);

