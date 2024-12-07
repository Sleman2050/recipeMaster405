// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz0hHw08hBGSP8fSIfCixojGCo29YJjFE",
  authDomain: "recipemaster-1f50a.firebaseapp.com",
  databaseURL: "https://recipemaster-1f50a.firebaseio.com",
  projectId: "recipemaster-1f50a",
  storageBucket: "recipemaster-1f50a.appspot.com",
  messagingSenderId: "960244317926",
  appId: "1:960244317926:web:c742a09e786d5ae5a7c527",
  measurementId: "G-NSRQ5GEQK6",
};


const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);



