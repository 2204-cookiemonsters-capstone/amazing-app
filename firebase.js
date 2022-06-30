//firebase configs here

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBr95jUf8aRaCHXOTr7hUMnTkHasYSu70Q",
  authDomain: "capstone-b8471.firebaseapp.com",
  projectId: "capstone-b8471",
  storageBucket: "capstone-b8471.appspot.com",
  messagingSenderId: "85458228356",
  appId: "1:85458228356:web:a2414e562bc2886c0e9ed1",
  measurementId: "G-WJ3F4MC6XD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);