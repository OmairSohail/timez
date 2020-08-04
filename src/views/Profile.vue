<template>
  <v-container>
      <p class="subheading grey--text">Profile</p>
      <p class="h6">Customize Your Profile</p>
      
      <v-container class="d-flex flex-column justify-center align-center">
          <v-avatar size="150">
                <img
                  :src="getImage.profileImage"
                >
          </v-avatar>
          
          <v-file-input label="Profile Image" v-model="profileImage" @change="uploadImage($event)" prepend-icon="mdi-camera" accept="image/png, image/jpeg, image/bmp" hide-input>
          </v-file-input>
         
            <v-progress-linear
            color="light-blue"
            height="15"
            :value="value"
            striped
            v-if="value > 0"
           >
           <span class="caption white--text" >{{value}}%</span>
           </v-progress-linear>
        
           
          <p class="caption">Upload Your Profile Image</p>
      </v-container>

      <v-container>
        <v-form ref="updateProfileForm" v-model="valid">
            <v-layout row justify-space-between>
                <v-flex xm12 sm12 md6>
                     <v-text-field label="Username" :rules="rules.usernameRule" class="mx-2" v-model="profileData.username" outlined dense></v-text-field> 
                </v-flex>
                <v-flex xm12 sm12 md6>
                     <v-text-field label="Phone" :rules="rules.phoneRule" class="mx-2" v-model="profileData.phone" outlined dense></v-text-field> 
                </v-flex>
            </v-layout>
            <v-layout row justify-space-between>
                <v-flex xm12 sm12 md12>
                     <v-select :items="countries" outlined dense class="mx-2" :rules="rules.locationRule" v-model="profileData.location" label="Location"></v-select>
                </v-flex>
            </v-layout>
             <v-layout row justify-space-between>
                <v-flex xm12 sm12 md12>
                    <v-btn color="info" class="mx-2" @click.prevent="updateUser()">Update Profile</v-btn>
                </v-flex>
            </v-layout>

         </v-form>
      </v-container>

      <v-container>
       
            <v-layout row justify-center align-center>
                <v-flex xm12 sm12 md6>
                     <h4 class="text-right mx-2" >Send a password reset email ?</h4> 
                </v-flex>
                <v-flex xm12 sm12 md6>
                     <v-btn class="mx-2" @click="resetPassword()">Send Email  <v-icon dark right>mdi-arrow-right</v-icon></v-btn> 
                </v-flex>
            </v-layout>
            
      </v-container>

       <v-container class="mt-4">
        <h3 class="font-weight-light mb-4">Change Your Email Address !</h3>
            <v-layout row justify-space-between align-content-center>
                <v-flex xm12 sm9 md6>
                       <v-text-field label="Enter New Email" v-model="email" dense outlined class="mx-2"></v-text-field>
                </v-flex>
                <v-flex xm12 sm3 md2>
                       <v-btn block color="primary" @click="updateEmail()">Update Email</v-btn>
                </v-flex>
            </v-layout>
            
      </v-container>
 
               <v-snackbar
                    v-model="snackbar"
                  >
                    {{ text }}

                    <template v-slot:action="{ attrs }">
                      <v-btn
                        color="white"
                        text
                        v-bind="attrs"
                        @click="snackbar = false"
                      >
                        Close
                      </v-btn>
                    </template>
               </v-snackbar>

  </v-container>

  
</template>

<script>
export default {
      name:'profile',
      data(){
        return{
          countries:['Pakistan','China','Russia','Turkey','Finland'],
          profileData:{
            username:null,
            phone:null,
            location:null,

          },
          rules:{
            usernameRule:[
              v => (!!v || 'Username must be filled'),
              v => (v && v.length <= 15) || 'Username must be less than 15 characters',

            ],
            phoneRule:[
               v => (!!v || 'Phone is required'),
               v => (v && v.length === 11) || 'Phone Number must be 11 digits',
            ],
            locationRule:[
              
            ]
          },
          profileImage:[],
          snackbar:false,
          email:null,
          text:'',
          value:0,
          file:null,
          uploading:false,
          valid:false,
          userProfile:null,
        }
      },
      computed:{
        getImage(){   
          // const id = this.$firebase.auth().currentUser.uid; 
          const id = this.$store.state.user.id;
          console.log(id)
          const ref = this.$firebase.database().ref(`timez_Users/${id}`);
       
          ref.on('value', (snapshot)=>{
             
             this.userProfile = snapshot.val();
          });  
          return this.userProfile;
        }
      },
      methods:{
          async updateUser(){
              if(this.uploading === false)
              {
                const id = this.$firebase.auth().currentUser.uid;
                const user = this.$firebase.auth().currentUser;
                const ref = this.$firebase.database().ref(`timez_Users/${id}`);
                
                user.updateProfile({
                  photoURL:this.file,
                });

                this.$store.dispatch('updatePhoto',this.file);
                const writeData = (username,phone,location,profileImage) => { 
                    ref.update({
                      username:username,
                      phone:phone,
                      location:location,
                      profileImage:profileImage
                    }).then(console.log('done')).catch(err => console.log(err.message));
                }
                
               await writeData(this.profileData.username,this.profileData.phone,this.profileData.location,this.file);
                   
                this.$refs.updateProfileForm.reset(); 
                this.profileImage = null;   
                this.snackbar = true;
                this.text = 'Your Profile Is Updated Successfully!'
              }else{
                this.snackbar = true;
                this.text = 'Please Wait while image is uploaded !'
              }
          },
          resetPassword(){
            var auth = this.$firebase.auth();
            var emailAddress = this.$firebase.auth().currentUser.email;

            auth.sendPasswordResetEmail(emailAddress).then(() => {
                this.snackbar = true;
                this.text = 'Password reset email has been Sent !'
            }).catch((error) => {
                this.snackbar = true;
                this.text = error.message;
            });
          },
          updateEmail(){
            var user = this.$firebase.auth().currentUser;

            user.updateEmail(this.email).then(() => {
                this.snackbar = true;
                this.text = 'Email has been Successfully Updated'
            }).catch((error) => {
                this.snackbar = true;
                this.text = error.message;
            });

          },
          uploadImage(e){
             const storageRef = this.$firebase.storage().ref('Timez/');
             const file = e;
             const uploadTask = storageRef.child(e.name).put(file);

              // Register three observers:
              // 1. 'state_changed' observer, called any time the state changes
              // 2. Error observer, called on failure
              // 3. Completion observer, called on successful completion
              uploadTask.on('state_changed', (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                this.uploading = true;
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                this.value = progress;
                switch (snapshot.state) {
                  case this.$firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                  case this.$firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                }
              }, (error) => {
                  this.snackbar = true;
                  this.text = error.message;
              }, () => {
                
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                  console.log('File available at', downloadURL);
                  this.file = downloadURL;
                  this.uploading = false;
                });
              });

          }
      }
}
</script>

<style>

</style>