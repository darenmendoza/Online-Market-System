import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyAlpj_JQDsp0Poq5kAq7ISlVifpswIxjj4",
  authDomain: "vue-firebase-5c4f1.firebaseapp.com",
  databaseURL: "https://vue-firebase-5c4f1.firebaseio.com",
  projectId: "vue-firebase-5c4f1",
  storageBucket: "vue-firebase-5c4f1.appspot.com",
  messagingSenderId: "963288963689",
  appId: "1:963288963689:web:29dac6532d020de101a0f8",
  measurementId: "G-GN5FEN8WTX"
};

let app = null;

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

export default firebase;
