import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDvhom4XzSVFvDScEWhCeWvNZruJ9NMqaI",
  authDomain: "whats-app-clone-9339f.firebaseapp.com",
  projectId: "whats-app-clone-9339f",
  storageBucket: "whats-app-clone-9339f.appspot.com",
  messagingSenderId: "87390807239",
  appId: "1:87390807239:web:20f0d55959363dec244ae2",
  measurementId: "G-E6TJVFV085"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
