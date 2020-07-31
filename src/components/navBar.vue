<template>
  <div>
     <!-- <v-bottom-navigation
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
      -->
    <v-app-bar>
     <!-- <v-toolbar > -->
        <v-app-bar-nav-icon @click="drawer = !drawer" v-if="status.loggedIn"></v-app-bar-nav-icon>
        <v-toolbar-title >
            <span class="font-weight-bold">Timez</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn   link text>Home</v-btn>
        <v-btn   link text>Contact</v-btn>
        <v-btn   link text>About</v-btn>
        <v-btn   link text v-if="!status.loggedIn">Login</v-btn>
        <v-btn   link text v-if="!status.loggedIn">Signup</v-btn>
        <v-btn text v-if="status.loggedIn">
            <span class="caption">{{status.email}}</span>
        </v-btn>
        <v-avatar color="teal" size="48" v-if="status.loggedIn">
            <span class="white--text headline">User</span>
        </v-avatar>
         <v-menu
            bottom
            origin="center center"
            transition="scale-transition"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                v-bind="attrs"
                v-on="on"
                text
                >
                 <v-icon class="grey--text"> mdi-chevron-down</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item list>
                    <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item>
                <v-list-item list>
                    <v-list-item-title>Signout</v-list-item-title>
                </v-list-item>
            </v-list>
         </v-menu>   
     <!-- </v-toolbar> -->
     
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" class="teal" absolute temporary>
      
    </v-navigation-drawer> 
    
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
           drawer:false, 
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