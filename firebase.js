// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTMfh4c7wZgthycMkZR7J0JoXtJ5CQYxg",
  authDomain: "auth-prod-55cf7.firebaseapp.com",
  projectId: "auth-prod-55cf7",
  storageBucket: "auth-prod-55cf7.appspot.com",
  messagingSenderId: "1082490830783",
  appId: "1:1082490830783:web:d3842458c8f1d8b2dcab0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authen = getAuth(app);
export const database = getFirestore(app); 