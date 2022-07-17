import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCCfVauOiUJova3kkmYc-ypZT8QRgNcxcw",
    authDomain: "whatsappclone-5d6b7.firebaseapp.com",
    projectId: "whatsappclone-5d6b7",
    storageBucket: "whatsappclone-5d6b7.appspot.com",
    messagingSenderId: "546301492995",
    appId: "1:546301492995:web:e8e7b02d09340a14b1f336",
    measurementId: "G-SG12E306K5"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()

  export {auth,provider};
  export default db;