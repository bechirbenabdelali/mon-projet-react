// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // ✔
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjKgzdR9myeibHAPXtHlCe0TFWMZHtIhE",
  authDomain: "chat-app-68273.firebaseapp.com",
  databaseURL: "https://chat-app-68273-default-rtdb.firebaseio.com",
  projectId: "chat-app-68273",
  storageBucket: "chat-app-68273.firebasestorage.app",
  messagingSenderId: "137025399073",
  appId: "1:137025399073:web:81240ae166a2dcd348b660",
  measurementId: "G-XKSDBQ5H99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getDatabase(app);