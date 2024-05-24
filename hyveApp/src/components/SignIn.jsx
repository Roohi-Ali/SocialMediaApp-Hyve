/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import logo from '../assets/h1.png'
import name from '../assets/Full-Logo-Colour.png'
import Button from '@mui/material/Button';
import './SignIn.css'
import { auth, provider } from '../firebase/firebaseConfig.js'
import { signInWithRedirect } from "firebase/auth";

const SignIn = () => {


    const login = () => {
        signInWithRedirect(auth,provider)
        console.log("SignedIN")
    }

    return (
        <div className='login'>
            <div className="loginLogo">
                <img src={logo} alt="logo" />
                <img src={name} alt="name" />

            </div>
            <Button type='submit' onClick={login}>
                SignIn
            </Button>
        </div>

    )
}

export default SignIn
