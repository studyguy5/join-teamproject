import { auth, db } from './firebase.js';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const DB_NAME = 'JoinDB';
const DB_VERSION = 1;

const STORES = {
  USERS: 'users',
  TASKS: 'tasks',
  CONTACTS: 'contacts',
};

/**
 * Wrapper für IndexedDB + Sync mit Firestore.
 * - IndexedDB für Offline (users/tasks/contacts)
 * - Firestore als Remote-Quelle (users)
 */
class Database {
  constructor() {
    this.db = null;
    // Promise, die aufgelöst wird, wenn IndexedDB bereit ist
    this.ready = this.init();
  }

  /**
   * IndexedDB initialisieren und Stores anlegen.
   */
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (event) => reject(event.target.error);
      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        if (!db.objectStoreNames.contains(STORES.USERS)) {
          db.createObjectStore(STORES.USERS, { keyPath: 'email' });
        }
        if (!db.objectStoreNames.contains(STORES.TASKS)) {
          db.createObjectStore(STORES.TASKS, { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains(STORES.CONTACTS)) {
          db.createObjectStore(STORES.CONTACTS, { keyPath: 'id', autoIncrement: true });
        }
      };
    });
  }

  async add(storeName, data) {
    await this.ready;
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(data);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async get(storeName, key) {
    await this.ready;
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async update(storeName, data) {
    await this.ready;
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async delete(storeName, key) {
    await this.ready;
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Nutzer in Firestore + IndexedDB speichern.
   * Erwartet: userData enthält mindestens { email, name }
   */
  async addUser(userData) {
    try {
      if (!auth.currentUser) {
        throw new Error('Kein angemeldeter Benutzer vorhanden.');
      }
      const uid = auth.currentUser.uid;

      const userDataToSave = {
        uid,
        email: userData.email,
        name: userData.name || '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        ...userData, // erlaubt weitere Felder (Avatar etc.)
      };

      const userDocRef = doc(db, 'users', uid);
      await setDoc(userDocRef, userDataToSave, { merge: true });

      // Lokal in IndexedDB (KeyPath = email)
      await this.add(STORES.USERS, {
        email: userDataToSave.email,
        uid: userDataToSave.uid,
        name: userDataToSave.name,
        // Timestamps als ISO-Strings lokal ablegen (serverTimestamp ist ein Sentinel)
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...userData, // zusätzliche Felder
      });

      return uid;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  }

  /**
   * Nutzer holen: bevorzugt per Firestore (falls angemeldet), sonst Query per Email,
   * oder Fallback auf IndexedDB.
   */
  async getUser(email) {
    try {
      // 1) Wenn angemeldet, hole eigenes Profil per UID
      if (auth.currentUser?.uid) {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          return userDoc.data();
        }
      }

      // 2) Wenn Email vorhanden, in Firestore nach Email suchen
      if (email) {
        const q = query(collection(db, 'users'), where('email', '==', email));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          return snapshot.docs[0].data();
        }
      }

      // 3) Fallback: lokal aus IndexedDB per Email
      if (email) {
        return await this.get(STORES.USERS, email);
      }

      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      // letzte Rettung: IndexedDB
      if (email) {
        return await this.get(STORES.USERS, email);
      }
      throw error;
    }
  }

  /**
   * Nutzer aktualisieren (Firestore + IndexedDB).
   * Achtung: Wenn sich die Email ändert, passt der Key in IndexedDB nicht mehr.
   */
  async updateUser(userData) {
    try {
      if (!auth.currentUser?.uid) {
        throw new Error('Kein angemeldeter Benutzer vorhanden.');
      }
      const uid = auth.currentUser.uid;

      const userDocRef = doc(db, 'users', uid);
      await setDoc(
        userDocRef,
        { ...userData, updatedAt: serverTimestamp() },
        { merge: true }
      );

      if (!userData.email) {
        throw new Error('Für das lokale Update wird die Email als Key benötigt.');
      }
      const existingLocal = await this.get(STORES.USERS, userData.email);
      const localMerged = {
        ...(existingLocal || {}),
        ...userData,
        updatedAt: new Date().toISOString(),
      };
      await this.update(STORES.USERS, localMerged);

      return uid;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Tasks (nur lokal)
  async addTask(taskData) {
    return this.add(STORES.TASKS, taskData);
  }
  async getTask(id) {
    return this.get(STORES.TASKS, id);
  }
  async updateTask(taskData) {
    return this.update(STORES.TASKS, taskData);
  }
  async deleteTask(id) {
    return this.delete(STORES.TASKS, id);
  }

  // Contacts (nur lokal)
  async addContact(contactData) {
    return this.add(STORES.CONTACTS, contactData);
  }
  async getContact(id) {
    return this.get(STORES.CONTACTS, id);
  }
  async updateContact(contactData) {
    return this.update(STORES.CONTACTS, contactData);
  }
  async deleteContact(id) {
    return this.delete(STORES.CONTACTS, id);
  }
}

const database = new Database();
export default database;