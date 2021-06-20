import firebase from 'firebase/app';
import 'firebase/firestore';

//
// const script = document.createElement('script');
// script.type = 'text/javascript';
// script.src = 'https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js';
// document.body.appendChild(script);

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAbjKRUxmvZKALw53A_g50YG4wwupfoxOs",
    authDomain: "wpproject-a2972.firebaseapp.com",
    projectId: "wpproject-a2972",
    storageBucket: "wpproject-a2972.appspot.com",
    messagingSenderId: "39508493214",
    appId: "1:39508493214:web:a809c2647e0eb4f78d0c8f",
    measurementId: "G-G4BEL22EEG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };