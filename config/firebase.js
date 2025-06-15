import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvFtrHV7b4r4uuvuP7W1YhbEWKQAGrHYA",
  authDomain: "talabaybayin.firebaseapp.com",
  projectId: "talabaybayin",
  storageBucket: "talabaybayin.appspot.com",
  messagingSenderId: "776234963304",
  appId: "1:776234963304:web:789130c8ff54a3bf8486dd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app }; // Export both auth and app
