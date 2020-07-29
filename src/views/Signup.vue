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
                <v-toolbar-title>Signup form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form ref="loginform" v-model="valid">
                   <v-text-field
                    label="Username"
                    prepend-icon="mdi-clipboard-account"
                    v-model="userdata.username"
                    type="text"
                    :rules="rules.usernameRule"
                  ></v-text-field>

                  <v-text-field
                    label="Email"
                    prepend-icon="mdi-email-edit"
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

                  <v-text-field
                    label="Confirm Password"
                    v-model="userdata.confirmpassword"
                    prepend-icon="mdi-lock"
                    :rules="rules.confirmpasswordRule"
                    type="password"
                  ></v-text-field>
                  
                   <v-checkbox
                    v-model="userdata.terms"
                    label="I Accept The Terms And Conditions"
                    ></v-checkbox>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="teal" text @click="signup()">Create Account</v-btn>
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
    name:'signup',
    props:{
        source:String
    },
    data()
    {
        return{
            valid:false,
            overlay:false,
            snackbar:false,
            text:'Hello',
            userdata:{
                username:null,
                email:null,
                password:null,
                confirmpassword:null,
                terms:false
            },
            rules:{
                usernameRule:[
                     v => !!v || 'Username is required',
                     v => (v && v.length <= 15) || 'Username Should Be Less than 15 characters',
                ],
                emailRule:[
                     v => !!v || 'E-mail is required',
                     v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                passwordRule:[
                     v => !!v || 'Password is required',
                     v => (v && v.length >= 8) || 'Password must be greater than 8 characters',
                ],
                confirmpasswordRule:[
                     v => (!!v && v) === this.userdata.password || 'Please Confirm Your Password',      
                ]
            }
        }
    },
    methods:{
        async signup(){
            if(this.userdata.terms == true)
            {
              const writeData = (data,id) => {
                const ref =  this.$firebase.database().ref(`timez_Users/${id}`);
                ref.set(data);
              }

              this.overlay = true;  
              await this.$firebase.auth().createUserWithEmailAndPassword(this.userdata.email,this.userdata.password)
              .then(()=>{
                  this.$firebase.auth().onAuthStateChanged((user)=>{
                     if(user)
                     {
                        const id = user.uid;
                        writeData(this.userdata,id);
                        user.updateProfile({
                             displayName:this.userdata.username
                        });
                        console.log('user logged in !')
                        this.$router.replace('/');
                     }else{
                        this.overlay = false;
                        console.log('user not logged in !')
                     }
                  })
                  
               })
              .catch((err)=>{
                   this.overlay = false;
                   this.text = err.message;
                   this.snackbar = true;
              })
            }else{  
              this.text = 'You Have To Accept The Terms & Conditions First';
              this.snackbar = true;
            }
        }
    }
}
</script>

<style>

</style>