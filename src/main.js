import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

// FIREBASE
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAv0iXoVETQxjvwc98k6J3jufelJE7UB4Y",
  authDomain: "vue-projects-6adeb.firebaseapp.com",
  databaseURL: "https://vue-projects-6adeb.firebaseio.com",
  projectId: "vue-projects-6adeb",
  storageBucket: "vue-projects-6adeb.appspot.com",
  messagingSenderId: "1065277667255",
  appId: "1:1065277667255:web:c351358ccc77cdf62a9a32"
};

if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
}
Vue.prototype.$firebase = firebase;

firebase.auth().onAuthStateChanged((user)=>{
  if(user)
  {
    store.dispatch('createUser',{
      id:user.uid,
      username:user.displayName,
      email:user.email,
      photo:user.photoURL,
    }); 
  }else{
    store.dispatch('deleteUser');
  }
})


// Moment
import moment from 'moment';
Vue.prototype.$moment = moment;

// Axios
const axios = require('axios');
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;
// Components
Vue.component('navBar',require('./components/navBar.vue').default);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
