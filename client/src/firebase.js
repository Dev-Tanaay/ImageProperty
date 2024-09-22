// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-2fe12.firebaseapp.com",
  projectId: "realestate-2fe12",
  storageBucket: "realestate-2fe12.appspot.com",
  messagingSenderId: "806449123299",
  appId: "1:806449123299:web:04c3c8a1fd2acaa0a51ad6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };