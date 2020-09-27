import firebase from "firebase";
import conf from './config'

const firebaseApp = firebase.initializeApp({
  apiKey: conf.c_apiKey,
  authDomain: conf.c_authDomain,
  databaseURL: conf.c_databaseURL,
  projectId: 'messenger-clone-0',
  storageBucket: conf.c_storageBucket,
  messagingSenderId: conf.c_messagingSenderId,
  appId: conf.c_appId,
  measurementId: conf.c_measurementId
  });

  const db=firebaseApp.firestore();

  export default db;