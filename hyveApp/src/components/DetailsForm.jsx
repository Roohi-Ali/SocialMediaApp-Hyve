// eslint-disable-next-line no-unused-vars
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Details.css'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";
import { Box } from "@mui/material"

import UserContext from '../Context/UserContext'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';


const DetailsForm = () => {


    const [gender, setGender] = useState('male');
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        console.log('checking')
        console.log(user)
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.set('gender', gender);
        const newUser = Object.fromEntries(formData);
        newUser ? setUser(newUser) : console.log("cannotSet")
        console.log(user)

        //create a user in firestore - email, displayName, fullname, password, gender, dob, friends[emailadd]
        try {
            const docRef = await addDoc(collection(db, "userData"), {
                uid: newUser.uid,
                username: newUser.username,
                fullname: newUser.fullname,
                email: newUser.email,
                password: newUser.password
            });
            console.log("Document written with ID: ", docRef.id);
        }
        catch (e) {
            console.log(e)
        }


        // user ? navigate('/home') : console.log("User is empty")

        //create a New USerfirebase authentication
        //THen create the same user in firestore


    }




    const handleGenderChange = (e) => {
        setGender(e.target.value);
    }


    return (
        <div className="container">

            <div className='detailsForm'>
                <h1>Enter your Details</h1><br />
                <form onSubmit={handleSubmit}>
                    <Box sx={{ p: "16px", backgroundColor: "#c9e4d5", color: "#fff", my: "10px" }}>
                        <FormControl fullWidth>
                            <TextField required label="User name" margin="normal" id="username" name="username" value={user.username} />
                            <TextField required label="Full Name" margin="normal" id="fullname" name="fullname" />
                            <TextField required label="Email" margin="normal" id="email" name="email" value={user.email} />
                            <TextField required label="Password" margin="normal" id="password" name="password" value={user.password} />
                            <TextField required label="Date of Birth" defaultValue="dd/mm/yyyy" margin="normal" id="dob" name="dob" />
                            {/* <TextField required id="outlined-required" label="Gender" defaultValue="gender" margin="normal"/> */}
                            <Select
                                labelId="Input label"
                                id="Select"
                                value={gender}
                                onChange={handleGenderChange}
                            // {...register("gender")}
                            >
                                <MenuItem value="male" id="male" name="male">Male</MenuItem>
                                <MenuItem value="female" id="female" name="female">Female</MenuItem>
                            </Select>
                            <Button type="submit">Submit</Button>




                        </FormControl>
                    </Box>



                </form>
            </div>
        </div >
    )
}

export default DetailsForm

{/* <input type="text" placeholder="Enter your name"/>
        <input type="text" placeholder="Username"/>
        <input type="text" placeholder="email"/>
        <input type="text" placeholder="password"/>
        <input type="date" placeholder="Date of Birth"/>
        <input type="text" placeholder="Gender"/> */}
{/* <button type="submit">Submit</button> */ }
{/* if u want to add country */ }
{/* create a friend array */ }