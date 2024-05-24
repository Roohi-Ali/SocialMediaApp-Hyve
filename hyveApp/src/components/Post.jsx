/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import './Post.css'
import PropTypes from 'prop-types'
import { Avatar } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import NearMeIcon from '@mui/icons-material/NearMe';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton , Button } from '@mui/material';

import { db } from '../firebase/firebaseConfig'
import { doc, deleteDoc , updateDoc} from "firebase/firestore";

import { auth } from '../firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth';

const Post = ({ profilePic, myimage, username, timestamp, message, email, pid}) => {
    
    const [postKey, setPostKey] = useState("")
    const [user, setUser] = useState()
    const [loggedin, setloggedin] = useState(null)
    
    // const setMyUserFunction = ()=>{
    //     setloggedin(localStorage.getItem('loggedin'))
    //     setUser(JSON.parse(localStorage.getItem('user') || null))
    //     console.log("UUUUUSEEERRRRR: ", user)
    // }

    // useEffect(() => {
    //     setMyUserFunction()
    //     console.log("Loggedin: "+loggedin)
    // }, [loggedin])

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

    const handleDeleteButton = async()=>{
        console.log("Delete this post")
        console.log(pid)
        if ( user.email == email){
            console.log("Allowed to Delete")
            try {
                await deleteDoc(doc(db, "posts", pid));
                console.log('Deleted')
    
              } catch (e) {
                console.error("Error deleting document: ", e);
              }
        }else {
            console.log("You are Not allowed to DELETE this post")
            alert("Not Allowed")
        }
        
    }

    const updatePost = async ()=>{
        console.log("updatePost")
        if ( user.email == email){
            console.log("Allowed to Edit")
            const editMessage = prompt("Enter your new message")
                const editRef = doc(db, "posts", pid);
                await updateDoc(editRef, {
                caption: editMessage
                }).then(()=>{
                    console.log("Updated")
                })
        }else{
            console.log("You are Not allowed to edit this post")
            alert("Not Allowed")
        }
    }
    return (
        
        <div className='post'>
            <div className="postTop">
                
                <Avatar src={profilePic} className="postAvatar" />
                <div className="postTopInfo">
                    <h3>{username}</h3>
                    <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="postBottom">
                    <p>{message}</p>
                </div>

                {/* <div className='hiddenValue'>
                    <button onClick={handleDeleteButton}>Delete Button</button>
                </div> */}
                <div className="postImage">
                    { (myimage == "") ?
                            <div className="hideDiv" style={{display: "none"}}>
                            <img src={myimage} alt="userImage" />
                            </div> :
                            <div className="hideDiv">
                            <img src={myimage} alt="userImage" />
                            </div>
                    }
                    
                    

                    
                </div>

                <div className="postOptions">
                    {/* <div className="postOpt">
                        <ThumbUpIcon/>
                        <p>Like</p>
                    </div> */}
                    <div className="postOpt">
                        <ChatBubbleOutlineIcon disabled/>
                        <p>Comment</p>
                    </div>
                    <div className="postOpt">
                        <IconButton onClick={updatePost}>
                            <EditIcon />
                        </IconButton>
                        <p>Edit Post</p>
                    </div>
                    <div className="postOpt">
                        <IconButton onClick={handleDeleteButton}>
                            <DeleteIcon />
                        </IconButton>
                        <p>Delete Post</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

Post.propTypes = {
    profilePic: PropTypes.any,
    myimage: PropTypes.any,
    username: PropTypes.string,
    timestamp: PropTypes.any,
    message: PropTypes.string,
    email: PropTypes.string,
    pid: PropTypes.string
}


export default Post
