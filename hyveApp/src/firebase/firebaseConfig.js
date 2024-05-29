import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";

import { collection, getDocs, limit, query} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDApbLwaqyk9V8WUWlnR759_CZTLEELTsw",
  authDomain: "socialmediaapp-hyve.firebaseapp.com",
  projectId: "socialmediaapp-hyve",
  storageBucket: "socialmediaapp-hyve.appspot.com",
  messagingSenderId: "11273221844",
  appId: "1:11273221844:web:25e4e0bb0d1d99e3dfed41",
  measurementId: "G-TYDR8H7W2K"
};

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);
  const provider = new GoogleAuthProvider();

const logOutFromFirebase = ()=>{
  signOut(auth)
}


const getAllFriends = async()=>{
  const querySnapshot = await getDocs(query(collection(db, "friends")));
  let newArray = []
  querySnapshot.docs.map((doc) => {
    //console.log(JSON.stringify(doc.data()))
    newArray.push(doc.data())         
    //newArray = [...newArray, JSON.stringify(doc.data())]
  })
  return newArray
}


export { auth, db, storage, provider, logOutFromFirebase, getAllFriends}