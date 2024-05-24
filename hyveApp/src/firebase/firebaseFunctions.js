import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig'

import { collection, addDoc } from "firebase/firestore";
import { db } from './firebaseConfig';
import { updateProfile, onAuthStateChanged } from "firebase/auth";




export const createUserforAuth = async (data) => {
    console.log('entering this function')
    try {
        await createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential)=>{
            const user = userCredential.user
            console.log(user.uid)
            return user.uid
        })
    } catch (e) {
        console.log(e)
    }
};

// export const updateCreatedUser = async (data) => {
//     updateProfile(auth.currentUser, {
//         displayName: data.username, photoURL:data.photoURL, email: data.email, password:data.password
//       }).then(() => {
//         alert('profile Updates')
//         console.log(auth.currentUser)
//         return (auth.currentUser)
        
//       }).catch((error) => {
//         console.log(error)
//       });
// }

export const addUserToFireStore = async (data)=>{
    try{
        const docRef = await addDoc(collection(db, "userDetails"), {
            uid: "",
            username: data.username,
            fullname: data.fullname,
            email: data.email,
            password:data.password,
            dob:data.dob,
            gender:data.gender
        });
        console.log("Document written with ID: ", docRef.id);
    } catch(e){
        console.log(e)
    }
}