// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import CONFIG from "./consts";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import withFirebaseAuth from "react-with-firebase-auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: CONFIG.API_KEY,
  authDomain: CONFIG.AUTH_DOMAIN,
  projectId: CONFIG.PROJECT_ID,
  storageBucket: CONFIG.STORAGE_BUCKET,
  messagingSenderId: CONFIG.MESSAGING_SENDER_ID,
  appId: CONFIG.APP_ID,
  measurementId: CONFIG.MEASUREMENT_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

const providers = {
  googleProvider: new GoogleAuthProvider(),
};

const createComponentWithAuth = withFirebaseAuth({
  providers,
  firebaseAppAuth: auth,
});

export const signInWithGoogle = () => {
  signInWithPopup(auth, providers.googleProvider)
    .then(async (result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      localStorage.setItem("name", name ?? "Anonymous")
      localStorage.setItem("email", email ?? "")
      const savedUserRef = doc(db, `users`, result.user.uid);
      const user = await getDoc(savedUserRef);
      if (user.exists()) {
        console.log('found');
        return;
      } else {
        console.log(`User with ID ${result.user.uid} not found.`);
        try {
          const savedUserRef = doc(db, `users`, result.user.uid);
          await setDoc(savedUserRef, {
            displayName: name,
            email: email,
            savedArticlesArray: [],
          });
        } catch (error) {
          console.error('Error saving user:', error);
        }
      };
  }).catch((error) => {
    console.log(error);
  });
};

const signOutFirebase = () => {
  signOut(auth);
};

export {
  db,
  createComponentWithAuth,
  signOutFirebase as signOut,
};
