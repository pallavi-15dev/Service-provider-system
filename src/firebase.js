
import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from 'firebase/firestore';

 const vendorSystem = {
  apiKey: "AIzaSyCiIyUp9hdH5gvp17WQNAsVr7bLqpwN8bU",
  authDomain: "http-react-a19ac.firebaseapp.com",
  databaseURL: "https://http-react-a19ac-default-rtdb.firebaseio.com",
  projectId: "http-react-a19ac",
  storageBucket: "http-react-a19ac.appspot.com",
  messagingSenderId: "696048582382",
  appId: "1:696048582382:web:be306514c179bc2b23fdff"
};
const app = initializeApp(vendorSystem);
const db = getFirestore(app);
export const auth = getAuth(app);

export { db };
export default app;


