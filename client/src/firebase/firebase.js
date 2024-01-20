import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDP5Hi2Vp_8TrLMFlhx0ikThGONljmgqKc",
  authDomain: "bingeweb-38391.firebaseapp.com",
  projectId: "bingeweb-38391",
  storageBucket: "bingeweb-38391.appspot.com",
  messagingSenderId: "8722724316",
  appId: "1:8722724316:web:4648512bcfcb1db5098b19",
  measurementId: "G-ET88WQ0Q2B",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
