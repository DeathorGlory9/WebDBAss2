import React from "react";
import {Card, CardActions, CardHeader, FontIcon, RaisedButton} from "material-ui";
import { Route, Redirect } from 'react-router';
import {fb} from "../config/constants";

const cardStyles = {
  card : {
      width: "25%",
    margin: "auto",
      marginTop: 50,
  },
    header: {
        margin:"auto"
    }
}

class Login extends React.Component {
    state = {
        type: null,
        user: null
    }

    componentWillMount () {
        fb.auth().onAuthStateChanged(this.handleCredentials);
    }

    componentWillUnmount() {
        if(this.state.user !== null) {
            localStorage.setItem('type', this.state.type);
        }
    }

    handleClick = (type) => {
        const provider = new fb.auth.GoogleAuthProvider();
        fb.auth().signInWithPopup(provider)
            .then((success) => { this.handleCredentials(success.user) })
            .then(() => { this.handleLogin(type) });
    }

    handleCredentials = (params) => {
        console.log(params);
        this.setState({
            user: params,
            type: localStorage.getItem('type')
        });
    }

    handleLogin = (type) => {
        localStorage.setItem('type', type);
        this.setState({
            type: type
        });

        /* Add user to our mongodb database */
        /* MongoDB schema - will insert the user's details into the database */
        const user = {};
        user['user/' + this.state.user.uid] = {
            type: type,
            name: this.state.user.displayName,
            id: this.state.user.uid
        };
        fb.database().ref().update(user)
        localStorage.setItem('User',type)
    }

    handleSignout = () => {
        const vm = this;
        vm.setState({
            user: null,
            type: null
        });
        localStorage.setItem('type', null);
        fb.auth().signOut().then(function () {
            alert('You have been signed out');
        });
    }

    render()
    {
        return(
            <Route exact path="/login" render={() => (
                this.state.user === null ? (
                <Card style={cardStyles.card}>
                    <CardHeader style={cardStyles.header} title="Login" />
                    <CardActions>
                        <RaisedButton style={{marginRight:10}} onClick={() => this.handleClick('helpdesk')}>Helpdesk User</RaisedButton>
                        <RaisedButton onClick={() => this.handleClick('tech')}>Tech User</RaisedButton>
                    </CardActions>
                </Card>
                )
                : (
                    <Redirect to="/" />
                )
            )} />
        );
    }
}

export default Login;
