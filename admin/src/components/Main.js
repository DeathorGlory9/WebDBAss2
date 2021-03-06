import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Logout from './Logout'
import TicketPage from './TicketPage'
import CreateTicket from "./CreateTicket";

class Main extends Component {

    // The Main component renders one of the three provided
    // Routes (provided that one matches). Both the /roster
    // and /schedule routes will match any pathname that starts
    // with /roster or /schedule. The / route will only match
    // when the pathname is exactly the string "/"
    render(){
        return (
          <main>
            <Switch>
        	 	<Route path="/login" component={Login}/>
        		<Route path="/logout" component={Logout}/>
                <Route exact path='/' component={Home}/>
                <Route path="/ticket/:id" component={TicketPage}/>
                <Route path="/newTicket" component={CreateTicket}/>
            </Switch>
          </main>);
    }
}

export default Main
