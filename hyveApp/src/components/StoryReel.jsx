// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useState, useEffect } from 'react'
import "./StoryReel.css"
import Story from "./Story"

import { db } from '../firebase/firebaseConfig'
import { auth } from '../firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, limit, query } from 'firebase/firestore'
//StoryReel actually represents the Users 


const StoryReel = () => {

  const [stories, setStories] = useState('')

  const getUsersFromFirestore = async()=>{
  console.log("This function will get all users saved in firestore")
    const querySnapshot = await getDocs(query(collection(db, "friends"),limit(6)));
    //console.log(querySnapshot)
    setStories(querySnapshot.docs)
    

  }

  useEffect(()=>{
    getUsersFromFirestore()
  },[])

  const [image, setImage] = useState(["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjjGvLZ5_GT2QIKrAdXgrs56j_4LoKa7Jvh7x6XOfr3Sjus5ogBF1iLES7-ReVI-9cfBY&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgdL31igFiCb12CXFzx7nywG0QSXdt0tAUUkSo5RHFIS0Vr5EtCC8yMXTEILuZEc-5pK0&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvLhIYhlm7brZGTL8JL4l8u98Zn6e7DHPrYUyxNezRnt1jlu8qp_TOrQIOFxmLCGwhWiA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFE5XUB7KV1qcOnx1_9_LmKHDuKxY1-RHQT_PkF068aQ&s",
  "https://img.freepik.com/premium-photo/ai-generated-illustration-abstract-neon-lights-background-with-laser-rays-glowing-lines_441362-4561.jpg"
  ])

  return (
    <div className='storyReel'>

      {stories && stories.map((el, index) =>
        <Story key={index}
          image={image[index%5]}
          profileSrc={el.data().photoURL}
          title={el.data().displayName} />
      )}

      {/* <Story 
      image='https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
      profileSrc='https://images.pexels.com/photos/792326/pexels-photo-792326.jpeg?auto=compress&cs=tinysrgb&w=600' 
      title ='Abdur Rehman'/>

      <Story 
      image='https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=600' profileSrc='https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600' 
      title ='Ali'/>

      <Story 
      image='https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600' profileSrc='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPJoAzDp01inNEJSHc1cOi8Ck0JWhwXvD7GJkuGJ2HNmMxDNcCbGEci1st2Q&s' 
      title ='Hussain'/>

      <Story 
      image='https://images.pexels.com/photos/1366909/pexels-photo-1366909.jpeg?auto=compress&cs=tinysrgb&w=600' profileSrc='https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=600' 
      title ='Ducky'/> */}

    </div>
  )
}

export default StoryReel
