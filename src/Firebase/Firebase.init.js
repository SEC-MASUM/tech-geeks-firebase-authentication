import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNYCMFCHKvVkA8viQMdsXzIw7uGBYgs0k",
  authDomain: "tech-geeks-01.firebaseapp.com",
  projectId: "tech-geeks-01",
  storageBucket: "tech-geeks-01.appspot.com",
  messagingSenderId: "1046371910720",
  appId: "1:1046371910720:web:afa58ece6aedc148904ba5",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

export default firebaseApp;
