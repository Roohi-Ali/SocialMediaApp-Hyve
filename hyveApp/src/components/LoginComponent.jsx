/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import bg from '../assets/Full-Logo-Colour.png'


import { auth, storage } from '../firebase/firebaseConfig'
import { signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { db } from '../firebase/firebaseConfig'
import { collection, addDoc } from "firebase/firestore";

import { useNavigate } from 'react-router-dom'
import LogOut from './LogOut'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        hyve.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const defaultTheme = createTheme();


const LoginComponent = () => {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState({})
  const [loggedin, setLoggedin] = useState(false)

  const navigate = useNavigate();



  const funcSignIn = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(auth.currentUser));
            localStorage.setItem('loggedin', true)
            setUser({ email: email, photoURL: auth.currentUser.photoURL, displayName: auth.currentUser.displayName })
            setLoggedin(true)
            console.log("Signin Successful")

            navigate('/home')
          }
          else {
            console.log('User is not set in  local storage')
          }
        })
      })


  }
  const handleSubmit = (e) => {
    e.preventDefault()
    funcSignIn()

  }
  const register = () => {
    if (loggedin === true) {
      navigate('/home')
    }
    navigate('/register')
  }

  // const addUser = async ()=>{
  //   const tempUser = auth.currentUser
  //   const docRef = await addDoc(collection(db, "friends"), {
  //     displayName: tempUser.displayName,
  //     email: tempUser.email,
  //     photoURL:tempUser.photoURL
  //   });
  //   console.log("Document written with ID: ", docRef.id);
  //   console.log(tempUser.displayName+" "+tempUser.email+" "+tempUser.photoURL)
  // }


  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} sx={{
          backgroundImage: `url(${bg})`, backgroundRepeat: "no-repeat", backgroundColor: (t) =>
            t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: "500px", backgroundPosition: "center",
        }} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={{ my: 8, mx: 4, display: "flex", flexDirection: "column", alignItems: "center", }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <form onSubmit={handleSubmit}>
        
              <h1>Login to Your Account</h1>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => { setEmail(e.target.value) }}

              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => { setPassword(e.target.value) }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>

            </form>
            <Grid container>
              <Grid item xs>
                <Link href="/register" variant="body2">
                  Dont have an Account, Sign Up
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>

        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default LoginComponent


{/* <div>

      <form onSubmit={handleSubmit}>

        <h1>Login to Your Account</h1>
        
        <input type="email" name="email" onChange={(e) => { setEmail(e.target.value) }} />
        <input type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
        <input type="submit" value="Login" />
      </form>
  
      <button onClick={register}> Dont have an Account, Sign Up </button><br />
    </div> */}
{/* <input type="email" name="email" onChange={(e) => { setEmail(e.target.value) }} /> */ }
{/* <input type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} /> */ }
{/* <input type="submit" value="Login" /> */ }
{/* <button onClick={register}> Dont have an Account, Sign Up </button><br /> */}