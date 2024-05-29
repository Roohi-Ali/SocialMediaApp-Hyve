// eslint-disable-next-line no-unused-vars
import React , {useEffect, useState} from 'react'
import "./Sidebar.css"
import SidebarRow from "./SidebarRow"
// import Button from '@mui/material/Button';

import FlagIcon from '@mui/icons-material/AssistantPhoto';
import GroupIcon from '@mui/icons-material/Group';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import IconButton from '@mui/material/IconButton';

import { auth  } from '../firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const [user, setUser] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
        }
    });
    return () => {
        unsubscribe();
    };
}, []);

const handleViewfriends = ()=>{
  navigate('/viewfriends')
}
  return (
    <div className='sidebar'>
      <SidebarRow src = {user.photoURL} title={user.displayName}/>
      <SidebarRow  Icon = {FlagIcon} title='Pages' disabled/>
      <SidebarRow  Icon = {ChatBubbleIcon} title='Messenger' />
      <SidebarRow  Icon = {SmartDisplayIcon} title='Videos' />
      <SidebarRow  Icon = {StorefrontIcon} title='Market place'/>
      <IconButton onClick={handleViewfriends}>
      <SidebarRow  Icon = {GroupIcon} title='View Friends' />
      </IconButton>
      {/* <Button  variant="contained" sx={{ mt: 2, mb: 2, px: 5 , backgroundColor:"#ff3131"}} onClick={handleClickFriends}>
            Add Friends
      </Button> */}
    </div>
  )
}

export default Sidebar