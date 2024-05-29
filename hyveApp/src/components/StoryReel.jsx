// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useState, useEffect } from 'react'
import "./StoryReel.css"
import Story from "./Story"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


import { getAllFriends } from '../firebase/firebaseConfig'
//StoryReel actually represents the Users 


const StoryReel = () => {

  //const [stories, setStories] = useState('')
  const [friends, setFriends] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = friends.slice(firstIndex, lastIndex)
  const npage = Math.ceil(friends.length / recordsPerPage)


  const handleChange = (event, value) => {
    setCurrentPage(value)
  }


  useEffect(() => {
    getAllFriends()
      .then((data) => { setFriends(data) })
  }, [])

  const [image, setImage] = useState(["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjjGvLZ5_GT2QIKrAdXgrs56j_4LoKa7Jvh7x6XOfr3Sjus5ogBF1iLES7-ReVI-9cfBY&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgdL31igFiCb12CXFzx7nywG0QSXdt0tAUUkSo5RHFIS0Vr5EtCC8yMXTEILuZEc-5pK0&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvLhIYhlm7brZGTL8JL4l8u98Zn6e7DHPrYUyxNezRnt1jlu8qp_TOrQIOFxmLCGwhWiA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFE5XUB7KV1qcOnx1_9_LmKHDuKxY1-RHQT_PkF068aQ&s",
    "https://img.freepik.com/premium-photo/ai-generated-illustration-abstract-neon-lights-background-with-laser-rays-glowing-lines_441362-4561.jpg"
  ])

  return (
    <>
      <div className='storyReel'>

        {records && records.map((el, index) =>
          <Story key={index}
            image={image[index % 5]}
            profileSrc={el.photoURL}
            title={el.displayName} />
        )}

      </div>
      <div>
        <Stack spacing={2}>
          <Pagination count={npage} onChange={handleChange} />
        </Stack></div>
    </>
  )
}

export default StoryReel




// const getAllFriends = async()=>{
//   const querySnapshot = await getDocs(query(collection(db, "friends")));
//   const total = querySnapshot.docs.length
//   //console.log(total)
//   let pages = total/5
//   let result = (pages - Math.floor(pages)) !== 0
//   if (result){
//     pages = Math.floor(pages)+1
//   }else{
//     console.log("Pages: "+pages)
//   }

//   for (let i=0; i< pages; i++){
//     console.log(i)
//     const aQuery = query(collection(db, "friends"),orderBy("email"),startAt((10)), limit(5))
//     const documentSnapshots = await getDocs(aQuery)
//     console.log(documentSnapshots.docs)

//       documentSnapshots.docs.map((doc) => {
//       console.log(doc.data().email)
//       })

//   }
//}
// const getUsersFromFirestore = async () => {
//   console.log("This function will get all users saved in firestore")
//   const querySnapshot = await getDocs(query(collection(db, "friends"), limit(6)));
//   console.log(querySnapshot.docs)
//   querySnapshot.docs.map((doc) => {
//     console.log(doc.data())
//   })
//   console.log(querySnapshot.docs.length)
//   setStories(querySnapshot.docs)
// }