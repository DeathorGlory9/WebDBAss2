import React, { Component } from 'react';
import Header from './Header'
import Main from './Main'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
	<MuiThemeProvider>
  <div>
    <Header />
    <Main />
  </div>
  </MuiThemeProvider>
)


export default App

// import firebase from 'firebase';
//
// var config = {
// 	apiKey: "AIzaSyBohiyg74bn1VdyVJMJcTrSLtpWkt6LPGA",
// 	authDomain: "webdbass2.firebaseapp.com",
// 	databaseURL: "https://webdbass2.firebaseio.com",
// 	projectId: "webdbass2",
// 	storageBucket: "webdbass2.appspot.com",
// 	messagingSenderId: "746554571696"
// };
//
// firebase.initializeApp(config);
// var provider = new firebase.auth.GoogleAuthProvider();
// var user = false;
//
// firebase.auth().signInWithPopup(provider).then(function(result) {
//   // This gives you a Google Access Token. You can use it to access the Google API.
//   var token = result.credential.accessToken;
//   // The signed-in user info.
// 	user = result.user;
//   // ...
// }).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
// });
//
// function UserGreeting(props) {
//   return <h1>Welcome back!</h1>;
// }
//
// function GuestGreeting(props) {
//   return <h1>Please sign up.</h1>;
// }
//
// // function App(props) {
// //   const isLoggedIn = props.isLoggedIn;
// //   if (isLoggedIn) {
// //     return <UserGreeting />;
// //   }
// //   return <GuestGreeting />;
// // }
//
// var App = React.createClass(
// {
// 	getInitialState()
// 	{
// 	},
// 	render()
// 	{
// 		return <h1>test</h1>
// 	}
// });
//
// module.exports = App;
