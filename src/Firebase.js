import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDScSW8F9wj9WgoyEYCTf1qwlBibuukxqo",
    authDomain: "kwitter-a29dd.firebaseapp.com",
    databaseURL: "https://kwitter-a29dd-default-rtdb.firebaseio.com",
    projectId: "kwitter-a29dd",
    storageBucket: "kwitter-a29dd.appspot.com",
    messagingSenderId: "474211091770",
    appId: "1:474211091770:web:36724e5355e65911d9bc03",
    measurementId: "G-4BBJ9GDR8E"
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

var db = firebase.database();

export { db }