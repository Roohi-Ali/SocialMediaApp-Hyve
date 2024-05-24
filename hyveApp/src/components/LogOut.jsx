// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import {auth} from '../firebase/firebaseConfig'
import { signOut } from "firebase/auth";
// import { logOutFromFirebase } from '../firebase/firebaseConfig'

const LogOut = () => {

    
    const navigate = useNavigate()

    const logoutfunction = ()=>{    
        signOut(auth)
        localStorage.setItem('user',{})
        localStorage.setItem('loggedin', false)
        //alert("User is LoggedOut")
        navigate('/login')
        
        }

  return (
    <div>
      <Button type="button" variant="contained" onClick={logoutfunction} style={{backgroundColor:"#ff3131"}}>Log Out</Button>
      {/* <Button onClick={logoutfunction} 
      variant="contained"  
      sx={{ bgcolor: '#ff3131' }}>Log Out</Button> */}

    </div>
  )
}

export default LogOut
