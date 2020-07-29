<template>
   <v-app id="inspire">
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="teal"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                 
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form ref="loginform" v-model="valid">
                  <v-text-field
                    label="Email"
                    prepend-icon="mdi-account"
                    v-model="userdata.email"
                    type="text"
                    :rules="rules.emailRule"
                  ></v-text-field>

                  <v-text-field
                    label="Password"
                    v-model="userdata.password"
                    prepend-icon="mdi-lock"
                    :rules="rules.passwordRule"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="teal" text @click="login()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

     <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
     </v-overlay>

     <v-snackbar
      v-model="snackbar"
     >
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
  </v-app>
</template>

<script>
export default {
    name:'login',
    props:{
        source:String
    },
    data()
    {
        return{
            overlay:false,
            snackbar:false,
            text:'Hello',
            valid:false,
            userdata:{
                email:null,
                password:null
            },
            rules:{
                emailRule:[
                     v => !!v || 'E-mail is required',
                     v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                passwordRule:[
                     v => !!v || 'Password is required',
                     v => (v && v.length >= 8) || 'Password must be greater than 8 characters',
                ]
            }
        }
    },
    methods:{
        login()
        {
            this.$refs.loginform.validate();
            this.$firebase.auth().signInWithEmailAndPassword(this.userdata.email,this.userdata.password)
            .then(()=>{

                this.text = 'Logging In';
                this.snackbar = true;
                this.$router.replace('/');
             })
            .catch((err)=>{
                this.snackbar = true;
                this.text = err.message;
             })  
        }
    }
}
</script>

<style>

</style>