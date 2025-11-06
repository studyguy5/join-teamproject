// Firebase App initialisieren (v12.1.0)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
  getFirestore,
  enableIndexedDbPersistence,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyB_IdcKkQ1lf4bj_MY2Lg0Bxjjyh9QXQWs",
  authDomain: "signupfinal-7739e.firebaseapp.com",
  projectId: "signupfinal-7739e",
  storageBucket: "signupfinal-7739e.firebasestorage.app",
  messagingSenderId: "1015305876711",
  appId: "1:1015305876711:web:37da6ef12da29097359e42",
};


function createApp(config) {
  return initializeApp(config);
}


function createAuth(appInstance) {
  return getAuth(appInstance);
}


function setAuthPersistence(authInstance) {
  setPersistence(authInstance, browserLocalPersistence)
    .catch((e) => {
      console.warn("Konnte Auth-Persistenz nicht setzen:", e);
    });
}


function createFirestore(appInstance) {
  return getFirestore(appInstance);
}


function enableFirestorePersistence(dbInstance) {
  enableIndexedDbPersistence(dbInstance)
    .catch((e) => {
      console.warn("IndexedDB-Persistenz für Firestore nicht aktiv:", e);
    });
}


const app = createApp(firebaseConfig);


const auth = createAuth(app);
setAuthPersistence(auth);


const db = createFirestore(app);
enableFirestorePersistence(db);


export { app, auth, db };