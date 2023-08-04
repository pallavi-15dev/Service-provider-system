
import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from 'firebase/firestore';

 const vendorSystem = {
  apiKey: "AIzaSyCNxN1GBOEjL6Zc7OuFROaawNhqLPoBOuk",
  authDomain: "vendorsystem-9d2c9.firebaseapp.com",
  projectId: "vendorsystem-9d2c9",
  storageBucket: "vendorsystem-9d2c9.appspot.com",
  messagingSenderId: "653315083444",
  appId: "1:653315083444:web:88356617d3eb92fcad1be1",
  measurementId: "G-F3NPDCENV8"
};
const app = initializeApp(vendorSystem);
const db = getFirestore(app);
export const auth = getAuth(app);

export { db };
export default app;


