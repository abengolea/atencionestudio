// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyChpcY_uC9sMvjHpy_N51uS89lqwZJfbV0',
  authDomain: 'adrian-legal-studio.firebaseapp.com',
  projectId: 'adrian-legal-studio',
  storageBucket: 'adrian-legal-studio.appspot.com',
  messagingSenderId: '159675272421',
  appId: '1:159675272421:web:d259c6c52a51f382a2089b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
