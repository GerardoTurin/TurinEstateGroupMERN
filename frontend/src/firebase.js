// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getEnvVariables } from "./helpers/getEnvVariables";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const { VITE_FIREBASE_API } = getEnvVariables();

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: VITE_FIREBASE_API,
    authDomain: "turinestategroup.firebaseapp.com",
    projectId: "turinestategroup",
    storageBucket: "turinestategroup.appspot.com",
    messagingSenderId: "785970341344",
    appId: "1:785970341344:web:a37218f7bc62e60662f785"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
