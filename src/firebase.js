/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {addDoc, collection, getFirestore} from 'firebase/firestore';
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA2rNwB-P9KHzAaIoNtAKWpARr1fFzBeoE",
  authDomain: "netflix-clone-3e4d1.firebaseapp.com",
  projectId: "netflix-clone-3e4d1",
  storageBucket: "netflix-clone-3e4d1.appspot.com",
  messagingSenderId: "356557100548",
  appId: "1:356557100548:web:c41bbb8f5cbc66f656c751"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = async () => {
    signOut(auth)
}

export {auth, db, login, signup, logout};