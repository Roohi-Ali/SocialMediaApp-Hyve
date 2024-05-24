/* eslint-disable no-unused-vars */
import React , { useEffect, useState } from 'react'
import "./Header.css"
import hyveLogo from '../../src/assets/H.png'
import SearchIcon from '@mui/icons-material/Search';

import HomeIcon from '@mui/icons-material/Home';
import FlagIcon from '@mui/icons-material/AssistantPhoto';
import GroupIcon from '@mui/icons-material/Group';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';


import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ForumIcon from '@mui/icons-material/Forum';
import { IconButton, Avatar, Button } from '@mui/material';


import { auth  } from '../firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth';

function Header() {

const [user, setUser] = useState({})

useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)
        }
    });
    return () => unsubscribe();
},[])

    return (
        <div className="header">

            <div className="headerLeft">
                <img src={hyveLogo} style={{ "borderRadius": "25px" }} alt="hyveLogo" />


                <div className="headerInput">
                    <SearchIcon />
                    <input type="text" placeholder="Search Hyve" />
                </div>
            </div>
            <div className="headerMiddle">
                <div className='headerOptions headerOptionsActive'>
                    <HomeIcon />

                </div>
                <div className='headerOptions'>
                    <FlagIcon />

                </div>
                <div className='headerOptions'>
                    <GroupIcon />

                </div>
                <div className='headerOptions'>
                    <SmartDisplayIcon />

                </div>
                <div className='headerOptions'>
                    <StorefrontIcon />

                </div>
            </div>

            <div className="headerRight">

                <div className='headerInfo'>
                    <Avatar alt={user.displayName} src={user.photoURL} />
                    <h4>{user.displayName}</h4>
                </div>
                <div className=''>
                    <IconButton>
                        <AddIcon />
                    </IconButton>
                    <IconButton>
                        <NotificationsIcon />
                    </IconButton>
                    <IconButton>
                        <ForumIcon />
                    </IconButton>
                    <IconButton>
                        <ExpandMoreIcon />
                    </IconButton>

                </div>

            </div>
        </div>
    )
}

export default Header
