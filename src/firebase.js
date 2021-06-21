import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/auth';
//
// const firebase = require('firebase');
// const firebaseui = require('firebaseui');

const firebaseConfig = {
    apiKey: "AIzaSyAbjKRUxmvZKALw53A_g50YG4wwupfoxOs",
    authDomain: "wpproject-a2972.firebaseapp.com",
    projectId: "wpproject-a2972",
    storageBucket: "wpproject-a2972.appspot.com",
    messagingSenderId: "39508493214",
    appId: "1:39508493214:web:a809c2647e0eb4f78d0c8f",
    measurementId: "G-G4BEL22EEG"
};


firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const auth = firebase.auth();


// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore, auth };