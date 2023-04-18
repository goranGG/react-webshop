import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVp_I0SnPWzXZCU7b0WgS24vhYK5dUlxA",
  authDomain: "react-webshop-db-fdc9d.firebaseapp.com",
  projectId: "react-webshop-db-fdc9d",
  storageBucket: "react-webshop-db-fdc9d.appspot.com",
  messagingSenderId: "708688898906",
  appId: "1:708688898906:web:c7b8db3d628586bf106163",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleAuthProvider = new GoogleAuthProvider();

googleAuthProvider.setCustomParameters({
  prompt: "select_account",
});

// handle login with Google
export const googleAuth = getAuth();
export const signInWithGooglePopup = () => {
  return signInWithPopup(googleAuth, googleAuthProvider);
};

// get DB from firebase
export const db = getFirestore();

// store user to firebase
export const createUserDocumentFromAuth = async (userAuth) => {
  // check does user instance exists in DB already
  // this will create virtual data to make sure nothing is overwritten
  const userDocRef = doc(db, "users", userAuth.uid);

  // this will create Object of userDocRef
  const userSnapshot = await getDoc(userDocRef);

  // check is user already saved to firebase
  if (!userSnapshot.exists()) {
    // save data to firebase
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName: userAuth.displayName,
        email: userAuth.email,
        createdAt: createdAt,
      });
    } catch (error) {
      console.log("Error creating user:", error);
    }
  }
  return userDocRef;
};
