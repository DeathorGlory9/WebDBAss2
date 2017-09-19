import firebase from 'firebase'

const config = {
	apiKey: "AIzaSyBohiyg74bn1VdyVJMJcTrSLtpWkt6LPGA",
	authDomain: "webdbass2.firebaseapp.com",
	databaseURL: "https://webdbass2.firebaseio.com",
	projectId: "webdbass2",
	storageBucket: "webdbass2.appspot.com",
	messagingSenderId: "746554571696"
};

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
