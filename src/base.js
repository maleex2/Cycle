import firebase from "firebase";

// Google Firebase Config Details

const app = firebase.initializeApp({
  apiKey: "AIzaSyBUgjS32l8zQV2ngMwd-bUkwgpT5p_37eU",
  authDomain: "cs317-cycling-support-app.firebaseapp.com",
  databaseURL: "https://cs317-cycling-support-app.firebaseio.com",
  projectId: "cs317-cycling-support-app",
  storageBucket: "cs317-cycling-support-app.appspot.com",
  messagingSenderId: "162927979153",
  appId: "1:162927979153:web:e0ec62ef27a0266026ed30",
  measurementId: "G-56D9EBP14L"
});



export default app;

