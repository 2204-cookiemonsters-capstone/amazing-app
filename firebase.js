import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBr95jUf8aRaCHXOTr7hUMnTkHasYSu70Q",
  authDomain: "capstone-b8471.firebaseapp.com",
  projectId: "capstone-b8471",
  storageBucket: "capstone-b8471.appspot.com",
  messagingSenderId: "85458228356",
  appId: "1:85458228356:web:a2414e562bc2886c0e9ed1",
  measurementId: "G-WJ3F4MC6XD",
};

// Initialize Firebase
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const firestore = getFirestore(app);
const auth = getAuth(app);

export {
  auth,
  firestore,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
};
