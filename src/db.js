import firebase from "firebase/compat/app"; // pullam odredene podatke - pullam app
import "firebase/database"; // real time database

const config = {
    // API KLJUCEVI koje smo preuzeli s firebase-a

        apiKey: "AIzaSyCOzbv8Aq-n_L3RUz644S_CURK_QK-McAw",
        authDomain: "nchat-vue.firebaseapp.com",
        projectId: "nchat-vue",
        storageBucket: "nchat-vue.appspot.com",
        messagingSenderId: "730699864216",
        appId: "1:730699864216:web:7c21d4770ccce5832a18ed"
}

const db = firebase.initializeApp (config);
export default db; // exportam defaultne podatke u moju app.vue komponentu