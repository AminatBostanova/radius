import * as firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "radius-ny.firebaseapp.com",
  databaseURL: "https://radius-ny.firebaseio.com",
  projectId: "radius-ny",
  storageBucket: "radius-ny.appspot.com",
  messagingSenderId: "722531140948",
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};
// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.firestore()
export default firebase;
