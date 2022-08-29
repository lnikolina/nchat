import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/firestore'
import { reactive, onUnmounted, ref } from 'vue'

const config = {
	apiKey: "AIzaSyAoROfBHSoxayB7TRofF8gcEFJodSiOWpI",
    authDomain: "nchat-68889.firebaseapp.com",
    databaseURL: "https://nchat-68889-default-rtdb.firebaseio.com",
    projectId: "nchat-68889",
    storageBucket: "nchat-68889.appspot.com",
    messagingSenderId: "204855599402",
    appId: "1:204855599402:web:160f8a9f47ad2ac46ffe53"
}

const db = firebase.initializeApp(config);
export default db;