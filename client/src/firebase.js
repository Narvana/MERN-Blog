// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-34e2e.firebaseapp.com",
  projectId: "mern-blog-34e2e",
  storageBucket: "mern-blog-34e2e.appspot.com",
  messagingSenderId: "1013787632995",
  appId: "1:1013787632995:web:c7aa79b2a0f2f3bb4d5f56"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
