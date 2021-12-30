// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBf5QXvkCCF82VKWYB1A614x1Nxkx9sGjw",
  authDomain: "chatting-app-dd8cf.firebaseapp.com",
  databaseURL: "https://chatting-app-dd8cf.firebaseaio.com",
  projectId: "chatting-app-dd8cf",
  storageBucket: "chatting-app-dd8cf.appspot.com",
  messagingSenderId: "355086398922",
  appId: "1:355086398922:web:f21ef7f294c4dafd228b33",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
