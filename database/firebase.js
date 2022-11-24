// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBJysqW9HVwNDAH38VbheH5sKNnXdtRWhA",

  authDomain: "tictactoe-746b2.firebaseapp.com",

  projectId: "tictactoe-746b2",

  storageBucket: "tictactoe-746b2.appspot.com",

  messagingSenderId: "990239102300",

  appId: "1:990239102300:web:e31927ea1d4c208d951d99",

  measurementId: "G-8VJNT31KHN"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;