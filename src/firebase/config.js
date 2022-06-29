import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDBfozDCpEdrxpwQUNfp-crGGbsWT-8pxQ",
  authDomain: "dojo-4a925.firebaseapp.com",
  projectId: "dojo-4a925",
  storageBucket: "dojo-4a925.appspot.com",
  messagingSenderId: "406643594980",
  appId: "1:406643594980:web:cf9d9ab118abf2d720bef1"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const firestore = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)