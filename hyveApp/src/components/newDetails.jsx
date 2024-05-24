// eslint-disable-next-line no-unused-vars
import React, {useState, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './Details.css'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";
import { Box } from "@mui/material"

import UserContext from '../Context/UserContext'
// import {updateCreatedUser} from '../firebase/firebaseFunctions'


const NewDetails = () => {

    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    

    const handleSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newUser = Object.fromEntries(formData);
        newUser ? setUser(newUser)  : console.log("cannotSet")
        // setUser(updateCreatedUser(user))
        alert("done")
        console.log(user)
        // newUser ? setUser(newUser)  : console.log("cannotSet")
        // user ? navigate('/home') : console.log("User is empty")

        //update the created user with displayname and picture
        //create a New USerfirebase authentication
        //THen create the same user in firestore
        
        
    }   


    
    return (
        <div className="container">

            <div className='detailsForm'>
                <h1>Enter your Details</h1><br />
                <form onSubmit={handleSubmit}>
                    <Box sx={{ p: "16px", backgroundColor: "#c9e4d5", color: "#fff", my: "10px" }}>
                        <FormControl fullWidth>
                            <TextField required  label="User name" margin="normal" id="username" name="username" value={user.username}/>

                            <Button type = "submit">Submit</Button>
     
                        </FormControl>
                    </Box>
                </form>
            </div>
        </div >
    )
}

export default NewDetails
