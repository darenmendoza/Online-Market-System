import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import firebase from "firebase/app";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAlpj_JQDsp0Poq5kAq7ISlVifpswIxjj4",
    authDomain: "vue-firebase-5c4f1.firebaseapp.com",
    databaseURL: "https://vue-firebase-5c4f1.firebaseio.com",
    projectId: "vue-firebase-5c4f1",
    storageBucket: "vue-firebase-5c4f1.appspot.com",
    messagingSenderId: "963288963689",
    appId: "1:963288963689:web:29dac6532d020de101a0f8",
    measurementId: "G-GN5FEN8WTX"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
