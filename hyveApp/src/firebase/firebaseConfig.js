import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";

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

export { auth, db, storage, provider, logOutFromFirebase}


// const firebaseConfig = {
//     apiKey: "AIzaSyAIoMauUMvQFQbilYWxBBv2SKrpH2fOQZE",
//     authDomain: "hyve-app-25c8c.firebaseapp.com",
//     projectId: "hyve-app-25c8c",
//     storageBucket: "hyve-app-25c8c.appspot.com",
//     messagingSenderId: "146689018058",
//     appId: "1:146689018058:web:30450529f69867cf944c33",
//     measurementId: "G-17412CJC2N"
//   };