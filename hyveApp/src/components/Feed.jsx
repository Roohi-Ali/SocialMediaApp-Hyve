// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Feed.css'
import StoryReel from './StoryReel'
import CreatePost from './CreatePost'
import Post from './Post'


import { useState, useEffect } from 'react'
import { collection, getDocs, orderBy, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

import { storage } from '../firebase/firebaseConfig'
import {  ref, getDownloadURL, getBlob } from "firebase/storage";

const Feed = () => {

  const [posts, setPosts] = useState([])
  //const [url, setUrl] = useState({});


 
  // const fetchData = async ()=>{
  //   try{
  //     const querySnapshot = await getDocs(query(collection(db,"posts"),orderBy('timeStamp','desc')));
  //     const data = querySnapshot.docs.map((doc)=>({
  //       id:doc.id,
  //       username: doc.data().username,
  //       message: doc.data().caption,
  //       email: doc.data().email,
  //       profilePic: doc.data().profilePic,
  //       timestamp: doc.data().timeStamp, 
  //       image:doc.data().image
  //     }));
  //     setPosts(data);
  //     return ()=> console.log("CleanUp Function")
  //   }
  //   catch(error){
  //     console.log("Error Fetching "+ error)
  //   }
  // }



  useEffect(()=>{
    
    const postsCollection = collection(db,"posts")
    const postsQuery = query(postsCollection, orderBy('timeStamp', 'desc'));

    
    // const proRef = ref(storage, `images/${email}`);
    // Set up real-time listener
    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        username: doc.data().username,
        message: doc.data().caption,
        email: doc.data().email,
        profilePic: doc.data().profilePic,
        timestamp: doc.data().timeStamp, 
        image:doc.data().image
      }));
      setPosts(postsData);
    });
    console.log(posts)
    // Cleanup subscription on unmount
    return () => unsubscribe();
   
  },[])
  
  

  return (
    <div className='feed'>
      <StoryReel />
      <CreatePost />
      
      {posts.map((post) => (
        
        <Post
          key={post.id}
          profilePic={post.profilePic}
          message={post.message}
          timestamp={post.timestamp}
          username={post.username}
          email={post.email}
          myimage={post.image}
          pid={post.id}
        />
        
      ))}


    </div>

  )
}

export default Feed


// const fetchData = async()=>{
  //   try{
  //     await getDocs(query(
  //       collection(db, "posts"), orderBy('timeStamp', 'desc'))
  //     )
  //       .then((querySnapshot) => {
  //         setPosts(querySnapshot.docs.map((doc) =>
  //         ({
  //           id: doc.id,
  //           username: doc.data().username,
  //           message: doc.data().caption,
  //           email: doc.data().email,
  //           profilePic: doc.data().profilePic,
  //           timestamp: doc.data().timeStamp, 
  //           image:doc.data().image
  //         })))
  //       })
  //   }
  //   catch (error){
  //     console.log("Error Fetching "+ error)
  //   }
  // }

  // useEffect(()=>{
  //   const unsubscribe = fetchData()
  //   return ()=>{
  //     console.log("UseEfetc")
  //     unsubscribe()
  //   }
  // },[])


  // const handleUpdatePost = (postEntry) => {
  //   const tempPosts = [...posts];
  //   tempPosts.push(postEntry);
  //   setPosts(tempPosts)

  // }


