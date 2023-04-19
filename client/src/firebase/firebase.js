// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyDP5Hi2Vp_8TrLMFlhx0ikThGONljmgqKc",
  authDomain: "bingeweb-38391.firebaseapp.com",
  projectId: "bingeweb-38391",
  storageBucket: "bingeweb-38391.appspot.com",
  messagingSenderId: "8722724316",
  appId: "1:8722724316:web:4648512bcfcb1db5098b19",
  measurementId: "G-ET88WQ0Q2B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)