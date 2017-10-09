import React from "react";
import {RaisedButton} from "material-ui";
import { Route } from 'react-router';
import {fb} from "../config/constants";
import Paper from "material-ui/Paper"
import Redirect from "react-router-dom/es/Redirect";

const cardStyles = {
  card : {
      width: "30%",
      margin: "35%",
      marginTop: "20%",
      display: 'inline-block',
      textAlign: "center",
      padding: 20
  },
    header: {
        margin:"auto",
        textAlign: "center",
        display: 'inline-block'
    },
    buttons: {
      margin: 10
    },
    button: {
      margin: 20,
        width: 120
    },
    background : {
      backgroundColor: "#888888"
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
        localStorage.setItem('Name',this.state.user.displayName)
        localStorage.setItem('id',this.state.user.uid)
        this.createUser();
    }

    //Creates user in laravel
    createUser(){
        var url = 'http://localhost/WebDBAss2/webfiles/public/api/techusers/create/' + this.state.user.uid + '/' + this.state.user.displayName;

        fetch(url, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data;',
          }
        });
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
            <div style={cardStyles.background}>
            <Route exact path="/login" render={() => (
                this.state.user === null ? (
                <Paper style={cardStyles.card} zDepth={1}>
                    <h1 style={cardStyles.header}>Login</h1>
                    <div style={cardStyles.buttons}>
                        <RaisedButton primary={true} style={cardStyles.button} onClick={() => this.handleClick('helpdesk')}>Helpdesk User</RaisedButton>
                        <RaisedButton secondary={true} style={cardStyles.button} onClick={() => this.handleClick('tech')}>Tech User</RaisedButton>
                    </div>
                </Paper>
                )
                : (
                    <Redirect to="/" />
                )
            )} />
            </div>
        );
    }
}

export default Login;
