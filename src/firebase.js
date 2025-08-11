import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAOV4fdBiuk3XslRqbWONdZ9JxK-mBlLZc",
  authDomain: "novel-research-a8b0a.firebaseapp.com",
  databaseURL: "https://novel-research-a8b0a-default-rtdb.firebaseio.com",
  projectId: "novel-research-a8b0a",
  storageBucket: "novel-research-a8b0a.firebasestorage.app",
  messagingSenderId: "984535897946",
  appId: "1:984535897946:web:fa7542a4789f7145da0563",
  measurementId: "G-7ZN9R4WNPH"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(); // ✅ Now exported
