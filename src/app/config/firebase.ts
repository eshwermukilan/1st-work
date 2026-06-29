import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJENt4QEGyclovGAEsppaT95EJzWnBgeo",
  authDomain: "first-project-16c95.firebaseapp.com",
  projectId: "first-project-16c95",
  storageBucket: "first-project-16c95.firebasestorage.app",
  messagingSenderId: "328145935102",
  appId: "1:328145935102:web:d03bb1cd972b807f9e63af",
  measurementId: "G-83TDM8L7TG"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
