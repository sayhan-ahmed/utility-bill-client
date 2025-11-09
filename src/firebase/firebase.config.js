// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDSMhyrVnAkC8LNTpK9-roivFkaIiVRGU",
  authDomain: "utility-bills-7097f.firebaseapp.com",
  projectId: "utility-bills-7097f",
  storageBucket: "utility-bills-7097f.firebasestorage.app",
  messagingSenderId: "683832443208",
  appId: "1:683832443208:web:9be602e4f193b1d3c6737d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
