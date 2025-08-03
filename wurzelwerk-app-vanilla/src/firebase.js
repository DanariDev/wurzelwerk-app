// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Optional: Firestore direkt mit importieren, falls du es nutzt
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiCESUailUcb-h54aA3NTLJWMHvF5zAGo",
  authDomain: "wurzelwerk-e6fc9.firebaseapp.com",
  projectId: "wurzelwerk-e6fc9",
  storageBucket: "wurzelwerk-e6fc9.appspot.com", // <-- ".appspot.com" statt ".firebasestorage.app"
  messagingSenderId: "151576720950",
  appId: "1:151576720950:web:d0aec229fc3c708c2d4a97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Firestore-Instanz initialisieren und exportieren
export const db = getFirestore(app);

// Optional: Falls du das app-Objekt woanders brauchst, auch exportieren
export default app;
