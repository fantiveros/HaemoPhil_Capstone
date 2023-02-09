// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdfogzxeMaf5JPJLY_lunOMCs70NEXlRQ",
  authDomain: "hemophil-prod.firebaseapp.com",
  projectId: "hemophil-prod",
  storageBucket: "hemophil-prod.appspot.com",
  messagingSenderId: "451282988767",
  appId: "1:451282988767:web:ac2a6f345be5e73449036a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authen = getAuth(app);
export const database = getFirestore(app); 