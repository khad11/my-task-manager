import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA_0ZlRR6Uirn7m-uZLToKm8uo2n4K1KI",
  authDomain: "my-portfilio-d4a90.firebaseapp.com",
  projectId: "my-portfilio-d4a90",
  storageBucket: "my-portfilio-d4a90.firebasestorage.app",
  messagingSenderId: "123368147325",
  appId: "1:123368147325:web:8fbcef0c43a04899be6414",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// auth
export const auth = getAuth();
