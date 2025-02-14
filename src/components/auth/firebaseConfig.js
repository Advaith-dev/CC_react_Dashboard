import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider  } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfjMiJ2nFYmnD1k0gXiISF8ZiNPKNS52Y",
  authDomain: "cashcrow-3a16e.firebaseapp.com",
  projectId: "cashcrow-3a16e",
  storageBucket: "cashcrow-3a16e.firebasestorage.app",
  messagingSenderId: "708843815503",
  appId: "1:708843815503:web:997c7dd0f2d543b3a5e03a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();