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

const dbName = 'joinDB';
const dbVersion = 1;

const stores = {
  users: 'users',
  tasks: 'tasks',
  contacts: 'contacts',
};

class Database {
  constructor() {
    this.db = null;
    this.ready = this.initIndexedDb();
  }

  initIndexedDb() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, dbVersion);
      request.onerror = event => reject(event.target.error);
      request.onsuccess = event => {
        this.db = event.target.result;
        resolve(this.db);
      };
      request.onupgradeneeded = event => this.createStores(event.target.result);
    });
  }


  createStores(db) {
    if (!db.objectStoreNames.contains(stores.users)) {
      db.createObjectStore(stores.users, { keyPath: 'email' });
    }
    if (!db.objectStoreNames.contains(stores.tasks)) {
      db.createObjectStore(stores.tasks, { keyPath: 'id', autoIncrement: true });
    }
    if (!db.objectStoreNames.contains(stores.contacts)) {
      db.createObjectStore(stores.contacts, { keyPath: 'id', autoIncrement: true });
    }
  }


  async add(storeName, data) {
    await this.ready;
    return this.runStoreTransaction(storeName, 'add', data);
  }


  async get(storeName, key) {
    await this.ready;
    return this.runStoreTransaction(storeName, 'get', key);
  }


  async update(storeName, data) {
    await this.ready;
    return this.runStoreTransaction(storeName, 'put', data);
  }


  async delete(storeName, key) {
    await this.ready;
    return this.runStoreTransaction(storeName, 'delete', key);
  }


  runStoreTransaction(storeName, method, value) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store[method](value);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }


  async addUser(userData) {
    this.checkUserAuthenticated();
    const uid = auth.currentUser.uid;
    const firestoreData = this.prepareFirestoreUser(userData, uid);
    await this.saveUserFirestore(uid, firestoreData);
    const localData = this.prepareLocalUser(userData, uid);
    await this.add(stores.users, localData);
    return uid;
  }


  checkUserAuthenticated() {
    if (!auth.currentUser) {
      throw new Error('Kein angemeldeter Benutzer vorhanden.');
    }
  }


  prepareFirestoreUser(userData, uid) {
    return {
      uid,
      email: userData.email,
      name: userData.name || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...userData,
    };
  }


  async saveUserFirestore(uid, userData) {
    const userDocRef = doc(db, 'users', uid);
    await setDoc(userDocRef, userData, { merge: true });
  }


  prepareLocalUser(userData, uid) {
    return {
      email: userData.email,
      uid: uid,
      name: userData.name || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...userData,
    };
  }


  async getUser(email) {
    if (auth.currentUser?.uid) {
      const user = await this.getUserByUid(auth.currentUser.uid);
      if (user) return user;
    }
    if (email) {
      const user = await this.getUserByEmailFirestore(email);
      if (user) return user;
      return await this.get(stores.users, email);
    }
    return null;
  }


  async getUserByUid(uid) {
    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists() ? userDoc.data() : null;
  }


  async getUserByEmailFirestore(email) {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const snapshot = await getDocs(q);
    return !snapshot.empty ? snapshot.docs[0].data() : null;
  }


  async updateUser(userData) {
    this.checkUserAuthenticated();
    const uid = auth.currentUser.uid;
    await this.updateUserFirestore(uid, userData);
    await this.updateUserLocal(userData);
    return uid;
  }


  async updateUserFirestore(uid, userData) {
    const userDocRef = doc(db, 'users', uid);
    await setDoc(userDocRef, { ...userData, updatedAt: serverTimestamp() }, { merge: true });
  }


  async updateUserLocal(userData) {
    if (!userData.email) {
      throw new Error('Für das lokale Update wird die Email als Key benötigt.');
    }
    const existingLocal = await this.get(stores.users, userData.email);
    const merged = { ...(existingLocal || {}), ...userData, updatedAt: new Date().toISOString() };
    await this.update(stores.users, merged);
  }


  async addTask(taskData) {
    return this.add(stores.tasks, taskData);
  }


  async getTask(id) {
    return this.get(stores.tasks, id);
  }


  async updateTask(taskData) {
    return this.update(stores.tasks, taskData);
  }


  async deleteTask(id) {
    return this.delete(stores.tasks, id);
  }


  async addContact(contactData) {
    return this.add(stores.contacts, contactData);
  }


  async getContact(id) {
    return this.get(stores.contacts, id);
  }


  async updateContact(contactData) {
    return this.update(stores.contacts, contactData);
  }


  async deleteContact(id) {
    return this.delete(stores.contacts, id);
  }

}

const database = new Database();
export default database;