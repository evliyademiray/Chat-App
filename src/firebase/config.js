// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9HSyu5MXkhQAdOyzbc5mZD3reiRJce14",
  authDomain: "evliya-54d8d.firebaseapp.com",
  projectId: "evliya-54d8d",
  storageBucket: "evliya-54d8d.appspot.com",
  messagingSenderId: "374327810181",
  appId: "1:374327810181:web:c37a9ef360061b9b2fb1ec",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Console'daki authentication bölümünün referansını alır
export const auth = getAuth(app);

//Google sağlayıcısının referansını alma
export const provider = new GoogleAuthProvider();

//Veritabanının referansını alır
export const db = getFirestore(app);
