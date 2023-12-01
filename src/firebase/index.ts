// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsG_BcNQDcK8Psp7Uayz_OLxAg5MTTPaQ",
  authDomain: "sky-booking-6fab1.firebaseapp.com",
  projectId: "sky-booking-6fab1",
  storageBucket: "sky-booking-6fab1.appspot.com",
  messagingSenderId: "117474167187",
  appId: "1:117474167187:web:f7310f658cda84d75fc066",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const store = getFirestore(app);
