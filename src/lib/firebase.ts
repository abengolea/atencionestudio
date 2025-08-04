// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAOwVadH_j_oFzhXLGvEho7pFXhoLYxuGo',
  authDomain: 'atencion-estudio-juridic-53354.firebaseapp.com',
  projectId: 'atencion-estudio-juridic-53354',
  storageBucket: 'atencion-estudio-juridic-53354.appspot.com',
  messagingSenderId: '171236726689',
  appId: '1:171236726689:web:d259c6c52a51f382a2089b', // AppId is often optional but good to have
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
