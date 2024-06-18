// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCd2X9WXZiBIAAI8TzrR7MUa3-EvZp2V0c",
//   authDomain: "test-app-rishav.firebaseapp.com",
//   projectId: "test-app-rishav",
//   storageBucket: "test-app-rishav.appspot.com",
//   messagingSenderId: "129567474175",
//   appId: "1:129567474175:web:8473430c58c34cac8f27ca",
//   measurementId: "G-B8JJ57Y5T6"
// };
// const firebaseConfig = {
//   apiKey: "AIzaSyCW6lCFoh4ZVFqDPerFqTP4EW_HFOaUAGw",
//   authDomain: "podcase-5f04a.firebaseapp.com",
//   projectId: "podcase-5f04a",
//   storageBucket: "podcase-5f04a.appspot.com",
//   messagingSenderId: "791991485951",
//   appId: "1:791991485951:web:8d9ef2bec8f3b4bf3653ca",
//   measurementId: "G-QTM1551FK9"
// };
const firebaseConfig = {
  apiKey: "AIzaSyAe5w700HHJmiqbei7uoWl4-EcSkInAIa8",
  authDomain: "podstream-c2se07.firebaseapp.com",
  projectId: "podstream-c2se07",
  storageBucket: "podstream-c2se07.appspot.com",
  messagingSenderId: "872754732148",
  appId: "1:872754732148:web:2789f73cf2f9406c00c521",
  measurementId: "G-KNKJWRTPQ6"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;