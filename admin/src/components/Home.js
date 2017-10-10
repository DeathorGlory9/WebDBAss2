import React from 'react'
import {TicketTable} from "./TicketTable";
import Paper from 'material-ui/Paper';

const appTokenKey = "appToken";

const style = {
	paper:{
   	 margin: 20,
   	 textAlign: 'center',
   	 display: 'inline-block',}

};

export default class Home extends React.Component
{
	//If the user is logged in
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
		return (<HomePage userType={localStorage.getItem('User')}/>);
	}
}

function HomePage(props) {
    const userType = props.userType;

    // If the user is a help desk user, show them table with all tickets
    if (userType == 'helpdesk') {
        return <HelpdeskHome/>;
    }
    // If the user is a technical user, only show assigned tickets
    else {
        return <TechnicalHome/>;
    }
}

const HelpdeskHome = () => (
  <div>
	<Paper style={style.paper} zDepth={1}>
	  <span><h2>Helpdesk - All Recent Tickets</h2></span>
	  <TicketTable/>
	</Paper>
  </div>
);

const TechnicalHome = () => (
	<div>
		<Paper style={style.paper} zDepth={1}>
			<span><h2>Welcome {localStorage.getItem('User')} - My Tickets</h2></span>
			<TicketTable assignedTo={localStorage.getItem('id')}/>
		</Paper>
	</div>
);
