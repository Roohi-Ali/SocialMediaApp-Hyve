// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect } from 'react'
import './CreatePost.css'
import { Avatar } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Button from '@mui/material/Button';


import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { auth } from '../firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth';
import { storage } from '../firebase/firebaseConfig'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
// import { v4 } from 'uuid'

const CreatePost = () => {

  
  const captionRef = useRef("")

  const [file, setFile] = useState(null)
  const [user, setUser] = useState({})
  const [imgurl, setImgurl] = useState("")

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


  const uploadPost = async () => {

    const docRef = await addDoc(collection(db, 'posts'),
      {
        profilePic: user.photoURL,
        username: user.displayName,
        email: user.email,
        caption: captionRef.current.value,
        timeStamp: serverTimestamp(),
        image:imgurl
      })
    console.log(docRef)
    captionRef.current.value = "";
    setImgurl("");
    alert("post Created")
    
    
  }


  const handleUrlChange = (e)=>{
    setImgurl(e.target.value)
  }
  // const handleImageUpload = () => {
  //   if (file) {
  //     const imageRef = ref(storage, `images/${file.name + v4()}`)
  //     uploadBytes(imageRef, file).then(() => {
  //         alert('image uploaded')
  //     })
  //   }
  //   uploadPost()
  // }

  return (
    <div className='createPost'>

      <div className='createPostTop'>
        <div className='userInfo'>
          <Avatar src={user.photoURL} />
          <h4>{user.displayName}</h4>
        </div>
        
        <form >
          <input type=""
            className="createPostInput"
            placeholder="What's on your mind?"
            ref={captionRef} />


          
          <input type='url' placeholder="Enter URL" onChange={handleUrlChange} value={imgurl}/>

          <Button variant="contained" sx={{ mt: 2, mb: 2, px: 5 , backgroundColor:'#ff3131'}} onClick={uploadPost}>
            Post
          </Button>

        </form>
      </div>
      <div className='createPostBottom'>

        <div className="createPostOption">
          <VideocamIcon style={{ color: "red" }} />
          <h3>Live Video</h3>
        </div>

        <div className="createPostOption">
          <PhotoLibraryIcon style={{ color: "green" }}  />
          <h3>Photo/Video</h3>
        </div>

        <div className="createPostOption">
          <InsertEmoticonIcon style={{ color: "orange" }} />
          <h3>Feeling/Activity</h3>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
