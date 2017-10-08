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

	<Paper style={style.paper} zDepth={1}>
	  <span><h2>{ localStorage.getItem('User') } - My Tickets</h2></span>
	  <TicketTable assignedTo={localStorage.getItem('id')}/>
	</Paper>
  </div>
)
