<template>
  <v-app>
    <v-main>
      <navBar :status="status"/> 
      <div class="ma-4 px-4"> 
      <router-view></router-view>
      </div> 
    </v-main>
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
