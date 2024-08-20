
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBJ_ojlsmPkdOH6AlOyc0T-7YhbUNjy9oo",
    authDomain: "stockcompare-b9e3a.firebaseapp.com",
    projectId: "stockcompare-b9e3a",
    storageBucket: "stockcompare-b9e3a.appspot.com",
    messagingSenderId: "320663255374",
    appId: "1:320663255374:web:3dd0a8f082475f6ed3861f",
    measurementId: "G-X6FMLFVXZW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };
