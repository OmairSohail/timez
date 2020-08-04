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
        <v-btn link to="/login" text v-if="!status.loggedIn">Login</v-btn>
        <v-btn link to="/signup" text v-if="!status.loggedIn">Signup</v-btn>
        <v-btn text v-if="status.loggedIn">
            <span class="caption">{{status.email}}</span>
        </v-btn>
        <v-avatar color="teal" size="48" v-if="status.loggedIn">
            <img :src="getImage" alt="" v-if="getImage">
            <!-- <img src="../assets/user.png" alt="" v-if="!getImage">  -->
        </v-avatar>
         <v-menu
            bottom
            origin="center center"
            transition="scale-transition"
            >
            <template v-slot:activator="{ on, attrs }">
               
                 <v-icon class="grey--text" 
                 v-bind="attrs"
                 v-on="on"
                 >
                 mdi-chevron-down
                 </v-icon>
                
            </template>

            <v-list>
                <v-list-item link to="/dashboard">
                    <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="logout()">
                    <v-list-item-title class="">Signout</v-list-item-title>
                </v-list-item>
            </v-list>
         </v-menu>   
     <!-- </v-toolbar> -->
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" class="white" absolute temporary>
       <v-layout row align-center justify-center class="mt-10">
           <v-flex xs5 sm5 md5>
               <v-avatar size="100">
                  <img :src="getImage" alt="">
               </v-avatar>
               <p class="subheading pa-2">{{getImage.username}}</p>
           </v-flex>
       </v-layout>

       <v-list dense>
           <v-subheader>Dashboard</v-subheader>
           <v-list-item link :to="link.route" v-for="link in links" :key="link.text">
               <v-list-item-action>
                   <v-icon>{{link.icon}}</v-icon>
               </v-list-item-action>
               <v-list-item-content>{{link.text}}</v-list-item-content>
           </v-list-item>
       </v-list>
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
           links:[
               { icon:'mdi-account',text:'Profile',route:'/profile'},
               { icon:'mdi-text-box-check-outline',text:'My Attendence',route:'/UserAttendence'},
           ]
       }
   },
   computed:{
        getImage(){
        //   const id = this.$store.state.user.id;
        //   const ref = this.$firebase.database().ref(`timez_Users/${id}`);
        //   var data;
        //   ref.once('value', (snapshot)=>{
        //      data = snapshot.val();
        //   });
          const photo = this.$store.state.user.photo; 
          return photo ? photo : '../assets/user.png';
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