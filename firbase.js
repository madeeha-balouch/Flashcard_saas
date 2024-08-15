// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIRBASE_API_KEY,
  authDomain: "flashcardsaas-c2e4f.firebaseapp.com",
  projectId: "flashcardsaas-c2e4f",
  storageBucket: "flashcardsaas-c2e4f.appspot.com",
  messagingSenderId: "1057904194980",
  appId: "1:1057904194980:web:fa31a17085a6f1a4eb3d31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);