<template>
  <v-container>
     <p class="h6">Your Attendence</p>

     <v-container fluid>
        <v-card class="py-2" v-for="a in attendence" :key="a">
           <v-layout row>
              <v-flex xs12 sm2 md2>
                 <div class="caption grey--text">Date</div>
                 <div class="">{{a.date}}</div>
              </v-flex>
              <v-flex xs12 sm2 md2>
                 <div class="caption grey--text">CheckIn</div>
                 <div class="">{{a.time}}</div>
              </v-flex>
              <v-flex xs12 sm2 md2>
                 <div class="caption grey--text">Checkout</div>
                 <div class="">{{}}</div>
              </v-flex>
              <v-flex xs12 sm1 md1>
                 <div class="caption grey--text">Breaks</div>
                 <div class="">1</div>
              </v-flex>
              <v-flex xs12 sm2 md2>
                 <div class="caption grey--text">Break Start & End</div>
                 <div class="">04:32PM - 05:00PM</div>
              </v-flex>
              <v-flex xs12 sm1 md1>
                 <div class="caption grey--text">Status</div>
                 <v-chip color="teal" text-color="white"> Present</v-chip>              
              </v-flex>
              <v-flex xs12 sm2 md2>
                 <div class="caption grey--text">Work Time</div>
                 <div class="">8 H 54 M</div>
              </v-flex>
           </v-layout>
        </v-card>
     </v-container>
  </v-container>
</template>

<script>
export default {
     name:'myattendence',
     data(){
       return{
          attendence:null,
       }
     },
     created(){
       const id = this.$store.state.user.id;
       const ref = this.$firebase.database().ref(`timez_attendence/${id}`);
       var data; 
       ref.on('value', (snapshot) => {
           data = snapshot.val(); 
       })
       
       

       this.attendence = data;
     },
     computed:{
        getId(){
           this.$firebase.auth().onAuthStateChanged((user)=>{
              if(user)
              {
                 this.id = user.uid;
              }
           })
          console.log(this.id);
          const ref = this.$firebase.database().ref(`timez_attendence/${this.id}`);
          var data;

          ref.on('value',(snapshot) => {
               data = snapshot.val();
          });
          
          console.log(data);

        }
     }
}
</script>

<style>

</style>