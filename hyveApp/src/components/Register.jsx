/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import * as React from 'react';
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
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage } from '../firebase/firebaseConfig'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'


import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'

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



export default function Register() {
  const [user, setUser] = useState({})
  const navigate = useNavigate();

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [photoURL, setPhotoURL] = useState("")
  const [uid, setUid] = useState("")
 

  const addUser = async ()=>{
    const tempUser = auth.currentUser
    const docRef = await addDoc(collection(db, "friends"), {
      displayName: tempUser.displayName,
      email: tempUser.email,
      photoURL:tempUser.photoURL
    });
    console.log("Document written with ID: ", docRef.id);
    console.log(tempUser.displayName+" "+tempUser.email+" "+tempUser.photoURL)
  }


  const handleSubmit = async (event)=>{
    event.preventDefault();
    const newUser = {
        displayName:username, 
        email:email,
        password:password,
        photoURL:photoURL,
        uid:uid
      }
      
      setUser(newUser)
      await createUserWithEmailAndPassword(auth, newUser.email,newUser.password)
      .then(()=>{
        updateProfile(auth.currentUser, {
          displayName: username, photoURL: photoURL
        }).then(() => {
          setUser(auth.currentUser)
          console.log("Profile Updated")
          //Adding User to FireStore Database
          addUser()
        })
      })
      .then(()=>{
        const storageRef = ref(storage, `images/${email}`)
          uploadBytes(storageRef, photoURL).then((snapshot) => {
          console.log('Uploaded a blob or file!');
        })
      })
      .then((u) => {
        console.log("Done")
        console.log(user)
        navigate('/login')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode+": "+errorMessage)
      });
  }


const handleFileChange = (e)=>{
  const url = e.target.value;
  setPhotoURL(url);
}


  return (
    
    <ThemeProvider theme={defaultTheme}>
      
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} sx={{  backgroundImage: `url(${bg})`, backgroundRepeat: "no-repeat",backgroundColor: (t) =>
              t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: "500px", backgroundPosition: "center",}}/>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={{my: 8,mx: 4,display: "flex",flexDirection: "column",alignItems: "center",}}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
           
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form"  noValidate  onSubmit={handleSubmit}  sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(e)=>{setUsername(e.target.value)}}
                
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e)=>{setEmail(e.target.value)}}
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
                onChange={(e)=>{setPassword(e.target.value)}}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="photoURL"
                // label="photoURL"
                type="url"
                id="photoURL"
                // autoComplete="photoURL"
                onChange={handleFileChange}
              />
              {/* {setUser({photoURL:""})} */}
              
              <Avatar src={photoURL}>
              
              </Avatar>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              
              <Grid container>
                <Grid item xs>
                  <Link href="/login" variant="body2">
                    Already a Member ? Go to Login
                  </Link>
                </Grid>

              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>

        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
