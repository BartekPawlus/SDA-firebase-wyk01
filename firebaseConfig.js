// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDI0DqC-Rk7Ooud8yObCPcLdisJvm2OJ60",
  authDomain: "sda01-wyk01.firebaseapp.com",
  projectId: "sda01-wyk01",
  storageBucket: "sda01-wyk01.appspot.com",
  messagingSenderId: "771949106804",
  appId: "1:771949106804:web:93d39f698a58947448e321"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
