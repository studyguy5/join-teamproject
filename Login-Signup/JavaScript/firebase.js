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

// Deine Firebase-Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyB_IdcKkQ1lf4bj_MY2Lg0Bxjjyh9QXQWs",
  authDomain: "signupfinal-7739e.firebaseapp.com",
  projectId: "signupfinal-7739e",
  storageBucket: "signupfinal-7739e.firebasestorage.app",
  messagingSenderId: "1015305876711",
  appId: "1:1015305876711:web:37da6ef12da29097359e42",
};

// App
const app = initializeApp(firebaseConfig);

// Auth mit persistenter Sitzung (Local Storage)
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch((e) => {
  console.warn("Konnte Auth-Persistenz nicht setzen:", e);
});

// Firestore + Offline-Persistenz (optional)
const db = getFirestore(app);
enableIndexedDbPersistence(db).catch((e) => {
  // z.B. mehrere Tabs offen -> kann fehlschlagen, ist aber unkritisch.
  console.warn("IndexedDB-Persistenz für Firestore nicht aktiv:", e);
});

export { app, auth, db };