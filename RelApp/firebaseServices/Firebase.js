import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAFK-fajqDf6t2m-_uet9z1bo-rhzu_w5A",
  authDomain: "relapp-cf157.firebaseapp.com",
  databaseURL: "https://relapp-cf157.firebaseio.com",
  projectId: "relapp-cf157",
  storageBucket: "relapp-cf157.appspot.com",
  messagingSenderId: "546164845389",
  appId: "1:546164845389:web:0680dc5535ceaecb052504",
  measurementId: "G-8Q6Y48E4ZP"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export default firebase;
