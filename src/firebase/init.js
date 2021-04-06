import firebase from "firebase";
import firestore from "firebase/firestore";

var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
// removed personal info about the Firebase config

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
