<template>
  <v-app>
    <navBar :status="status"/> 
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      status:{
        loggedIn:false,
        email:null,
      }
    }
  },
 
  created(){
    this.$firebase.auth().onAuthStateChanged((user)=>{
       if(user)
       {
         this.status.loggedIn = true;
         this.status.email = user.email;
       }else{
         this.status.loggedIn = false;
         this.status.email = null;
       } 
    })
  }
};
</script>
