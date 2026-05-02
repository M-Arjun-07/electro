import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCwHSLm5z2oQxds3M4ccjybIdvIAUL0S_Y",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "electro-c5bdf.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "electro-c5bdf",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "electro-c5bdf.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "25851196108",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:25851196108:web:9496504d7cb07258d30869",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-NHMDX44H78"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;