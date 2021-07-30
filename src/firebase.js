import firebase from 'firebase/app';
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBgbKhcPTl5Vj3M5LkKV65vqmlLr0oKV20",
  authDomain: "crud-gerardo-zuno.firebaseapp.com",
  projectId: "crud-gerardo-zuno",
  storageBucket: "crud-gerardo-zuno.appspot.com",
  messagingSenderId: "802323835108",
  appId: "1:802323835108:web:3ad04a75139f1bc66264f1",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export {firebase}