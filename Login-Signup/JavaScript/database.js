/**
 * This module handles all local and Firestore database operations for users, tasks, and contacts.
 * @module database
 * here we inport data from firebase for authentification and more
*/
export { database } from './firebase.js'; //wenn ausgeklammert, dann form in sign-up-submitHandler is not defined
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

/**
 * Database manager for IndexedDB and Firestore.
 * @class
*/
class Database {
  constructor() {
    /**
     * @type {IDBDatabase|null}
    */
   this.db = null;
   /**
    * @type {Promise<IDBDatabase>}
   */
  this.ready = this.initIndexedDb();
}

/**
 * Initializes IndexedDB database.
 * @returns {Promise<IDBDatabase>}
*/
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

/**
 * Creates required object stores if they don't exist.
 * @param {IDBDatabase} db
*/
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
  
  /**
   * Adds a record to the specified store.
   * @param {string} storeName
   * @param {Object} data
   * @returns {Promise<any>}
  */
 async add(storeName, data) {
   await this.ready;
   return this.runStoreTransaction(storeName, 'add', data);
  }
  
  /**
   * Gets a record from the specified store.
   * @param {string} storeName
   * @param {any} key
   * @returns {Promise<any>}
  */
 async get(storeName, key) {
   await this.ready;
   return this.runStoreTransaction(storeName, 'get', key);
  }
  
  /**
   * Updates a record in the specified store.
   * @param {string} storeName
   * @param {Object} data
   * @returns {Promise<any>}
  */
 async update(storeName, data) {
   await this.ready;
    return this.runStoreTransaction(storeName, 'put', data);
  }
  
  /**
   * Deletes a record from the specified store.
   * @param {string} storeName
   * @param {any} key
   * @returns {Promise<any>}
  */
 async delete(storeName, key) {
    await this.ready;
    return this.runStoreTransaction(storeName, 'delete', key);
  }
  
  /**
   * Runs a transaction operation on a store.
   * @param {string} storeName
   * @param {string} method
   * @param {any} value
   * @returns {Promise<any>}
  */
 runStoreTransaction(storeName, method, value) {
   return new Promise((resolve, reject) => {
     const transaction = this.db.transaction(storeName, 'readwrite');
     const store = transaction.objectStore(storeName);
     const request = store[method](value);
     request.onsuccess = () => resolve(request.result || null);
     request.onerror = () => reject(request.error);
    });
  }
  
  /**
   * Adds a user both to Firestore and local DB.
   * @param {Object} userData
   * @returns {Promise<string>} UID
  */
 async addUser(userData) {
   this.checkUserAuthenticated();
   const uid = auth.currentUser.uid;
   const firestoreData = this.prepareFirestoreUser(userData, uid);
   await this.saveUserFirestore(uid, firestoreData);
   const localData = this.prepareLocalUser(userData, uid);
    await this.add(stores.users, localData);
    return uid;
  }
  
  /**
   * Throws error if no authenticated user exists.
   * @throws {Error}
  */
 checkUserAuthenticated() {
   if (!auth.currentUser) {
     throw new Error('Kein angemeldeter Benutzer vorhanden.');
    }
  }
  
  /**
   * Prepares user data for Firestore.
   * @param {Object} userData
   * @param {string} uid
   * @returns {Object}
  */
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
  
  /**
   * Saves user data to Firestore.
   * @param {string} uid
   * @param {Object} userData
   * @returns {Promise<void>}
  */
 async saveUserFirestore(uid, userData) {
   const userDocRef = doc(db, 'users', uid);
   await setDoc(userDocRef, userData, { merge: true });
  }
  
  /**
   * Prepares user data for local DB.
   * @param {Object} userData
   * @param {string} uid
   * @returns {Object}
  */
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
  
  /**
   * Gets user data by authenticated user or email.
   * @param {string} email
   * @returns {Promise<Object|null>}
  */
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
  
  /**
   * Gets user data from Firestore via UID.
   * @param {string} uid
   * @returns {Promise<Object|null>}
  */
 async getUserByUid(uid) {
   const userDocRef = doc(db, 'users', uid);
   const userDoc = await getDoc(userDocRef);
   return userDoc.exists() ? userDoc.data() : null;
  }
  
  /**
   * Gets user data from Firestore via email.
   * @param {string} email
   * @returns {Promise<Object|null>}
  */
 async getUserByEmailFirestore(email) {
   const q = query(collection(db, 'users'), where('email', '==', email));
    const snapshot = await getDocs(q);
    return !snapshot.empty ? snapshot.docs[0].data() : null;
  }
  
  /**
   * Updates user data in Firestore and local DB.
   * @param {Object} userData
   * @returns {Promise<string>} UID
  */
 async updateUser(userData) {
   this.checkUserAuthenticated();
   const uid = auth.currentUser.uid;
   await this.updateUserFirestore(uid, userData);
   await this.updateUserLocal(userData);
   return uid;
  }
  
  /**
   * Updates user data in Firestore.
   * @param {string} uid
   * @param {Object} userData
   * @returns {Promise<void>}
  */
 async updateUserFirestore(uid, userData) {
   const userDocRef = doc(db, 'users', uid);
   await setDoc(userDocRef, { ...userData, updatedAt: serverTimestamp() }, { merge: true });
  }
  
  /**
   * Updates user data in local DB.
   * @param {Object} userData
   * @returns {Promise<void>}
  */
 async updateUserLocal(userData) {
   if (!userData.email) {
     throw new Error('Für das lokale Update wird die Email als Key benötigt.');
    }
    const existingLocal = await this.get(stores.users, userData.email);
    const merged = { ...(existingLocal || {}), ...userData, updatedAt: new Date().toISOString() };
    await this.update(stores.users, merged);
  }
  
  /**
   * Adds a task to the local DB.
   * @param {Object} taskData
   * @returns {Promise<any>}
  */
 async addTask(taskData) {
   return this.add(stores.tasks, taskData);
  }
  
  /**
   * Gets a task by ID from local DB.
   * @param {number} id
   * @returns {Promise<any>}
  */
  async getTask(id) {
    return this.get(stores.tasks, id);
  }
  
  /**
   * Updates a task in local DB.
   * @param {Object} taskData
   * @returns {Promise<any>}
  */
 async updateTask(taskData) {
   return this.update(stores.tasks, taskData);
  }
  
  /**
   * Deletes a task by ID from local DB.
   * @param {number} id
   * @returns {Promise<any>}
  */
 async deleteTask(id) {
   return this.delete(stores.tasks, id);
  }
  
  /**
   * Adds a contact to local DB.
   * @param {Object} contactData
   * @returns {Promise<any>}
  */
 async addContact(contactData) {
   return this.add(stores.contacts, contactData);
  }
  
  /**
   * Gets a contact by ID from local DB.
   * @param {number} id
   * @returns {Promise<any>}
  */
 async getContact(id) {
   return this.get(stores.contacts, id);
  }
  
  /**
   * Updates a contact in local DB.
   * @param {Object} contactData
   * @returns {Promise<any>}
  */
 async updateContact(contactData) {
   return this.update(stores.contacts, contactData);
  }
  
  /**
   * Deletes a contact by ID from local DB.
   * @param {number} id
   * @returns {Promise<any>}
  */
 async deleteContact(id) {
   return this.delete(stores.contacts, id);
  }
  
}
const database = new Database();
export default database;
