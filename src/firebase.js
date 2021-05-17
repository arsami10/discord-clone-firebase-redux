import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAZJYYAjoHRs_uIRcwbZGGEBGHBszSbqSI",
    authDomain: "discord-clone-1729e.firebaseapp.com",
    projectId: "discord-clone-1729e",
    storageBucket: "discord-clone-1729e.appspot.com",
    messagingSenderId: "942258786449",
    appId: "1:942258786449:web:e85af33700ff94d08faf30",
    measurementId: "G-Q5BCCWD311"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;