import React from 'react'
import firebase from 'firebase';

const appTokenKey = "appToken";

export default class Home extends React.Component
{
	componentWillMount()
	{
		firebase.auth().signOut()
		localStorage.removeItem(appTokenKey);
		this.props.history.push("/");
		return;
	}

	render()
	{
		return <LogoutPage/>;
	}
}

const LogoutPage = () => (
  <div>
    <h1>Loging out</h1>
  </div>
)
