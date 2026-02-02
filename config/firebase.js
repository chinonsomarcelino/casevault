// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWmdHHNGMzYRASAXjmfz4jsvvTMJtcEw4",
  authDomain: "casevault-14f0d.firebaseapp.com",
  projectId: "casevault-14f0d",
  storageBucket: "casevault-14f0d.firebasestorage.app",
  messagingSenderId: "265736702329",
  appId: "1:265736702329:web:0410b1b6c92702fce107a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}