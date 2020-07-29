<template>
  <div>
     <v-bottom-navigation
            :value="activeBtn"
            grow
            color="teal"
            height="100">

            <v-btn link to="/">
            <span>Home</span>
            <v-icon>mdi-home</v-icon>
            </v-btn>
                 
            <v-btn link to="/login" v-if="!status.loggedIn">
            <span>Login</span>
            <v-icon>mdi-login-variant</v-icon>
            </v-btn>
             
            <v-btn link to="/attendence" v-if="status.loggedIn">
            <span>Attendence</span>
            <v-icon>mdi-text-box-check-outline</v-icon>
            </v-btn>
             
            <v-btn v-if="status.loggedIn">
            <span>
                <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    v-bind="attrs"
                    v-on="on"
                    text
                    >
                    <span>{{status.email}}</span>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item link @click="logout()">
                    <v-list-item-title class="text-center">Logout</v-list-item-title>
                    </v-list-item>
                </v-list>
                </v-menu>
            </span>
            <v-avatar>
                <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                >
            </v-avatar>
            </v-btn>
         
            <v-btn link to="/signup"  v-if="!status.loggedIn">
            <span>Signup</span>
            <v-icon>mdi-account-plus</v-icon>
            </v-btn>

            <v-btn>
            <span>About Us</span>
            <v-icon>mdi-information-outline</v-icon>
            </v-btn>

            <v-btn>
            <span>Contact Us</span>
            <v-icon>mdi-card-account-mail-outline</v-icon>
            </v-btn>

     </v-bottom-navigation>
      <v-snackbar
            v-model="snackbar">
            {{ text }}
            <template v-slot:action="{ attrs }">
                <v-btn
                color="teal"
                text
                v-bind="attrs"
                @click="snackbar = false"
                >
                Close
                </v-btn>
            </template>
     </v-snackbar>
   </div>
</template>

<script>
export default {
   name:'navBar',
   props:{
    status:Object
   },
   data(){
       return{
           activeBtn:1,
           snackbar:false,
           text:null, 
       }
   },
   methods:{
       logout(){
           this.$firebase.auth().signOut()
           .then(this.$router.replace('/login'))
           .catch((err)=>{
              this.text = err.message;
              this.snackbar = true ;
           })
       }
   }
}
</script>

<style>

</style>