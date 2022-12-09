// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4YmwLuJtoG9RbbUDnuW-Iqqj0UVlZcaA",
  authDomain: "skku-routine-diary.firebaseapp.com",
  projectId: "skku-routine-diary",
  storageBucket: "skku-routine-diary.appspot.com",
  messagingSenderId: "469588987813",
  appId: "1:469588987813:web:5b029141b7610960e1624c",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

const fireStore = getFirestore(firebase);

export { fireStore };
