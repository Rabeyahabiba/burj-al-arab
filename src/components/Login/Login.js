import React, { useContext } from 'react';

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App';
import { useHistory, useLocation } from 'react-router';
const Login = () => {
    const [loggedInUser, setLoggedInUser] =useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    if (firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
   

    const handleGoogleSignIn = () => {       
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {   
   const {displayName, email} = result.user;
    const signedInUser = {name : displayName , email}      
    setLoggedInUser (signedInUser);
    history.replace(from);
  }).catch((error) => {    
    const errorMessage = error.message;
    console.log (errorMessage);
  });
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick ={handleGoogleSignIn}> Google Sign in</button>
        </div>
    );
};

export default Login;