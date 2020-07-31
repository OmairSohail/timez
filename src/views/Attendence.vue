<template>
  <v-app>
     <v-container>
        <v-layout row justify-space-between align-center>
           <v-flex xs12 sm6 md3 wrap justify-center align-self-center>
              <span class="text-h2"><digital-clock :blink="true" :twelveHour="true" class=""/></span>
           </v-flex>
           <v-flex xs12 sm4 md6 wrap v-if="onBreak">
                <v-alert type="success">
                  You are on Break !
               </v-alert>
           </v-flex>
           <v-flex xs12 sm2 md3 wrap justify-end class="pa-4">
              <v-btn color="teal" block dark @click="markAttendence()" v-if="!existence">
              <v-icon left>mdi-pencil</v-icon>
                        Mark
               </v-btn>
               <v-btn color="teal" block @click="startBreak()" dark  v-if="existence && !onBreak" large>
                     <v-icon left>mdi-food-fork-drink</v-icon>
                        Start Break
               </v-btn>
               <v-btn color="teal" block @click="endBreak()" dark  v-if="onBreak" large>
                     <v-icon left>mdi-close-circle</v-icon>
                        End Break
               </v-btn>   
           </v-flex>
        </v-layout>
     </v-container>


  </v-app>
</template>

<script>
import DigitalClock from "vue-digital-clock";
export default {
   name:'attendence',
   components:{
       DigitalClock
   },
   data(){
       return{
          existence:null, 
          onBreak:null,
       }
   },
   computed:{
    checkAttendence()
    {
       const name = this.$firebase.auth().currentUser.displayName;
       const date = this.$moment().format('DD-MM-YYYY');
       
       const checkMarking = (name,date) => {
           const ref = this.$firebase.database().ref(`timez_attendence/${name}/`).child(`${date}`);
           
           ref.once('value',(snapshot) => {
             if(snapshot.exists())
             {
               console.log('exist')
               this.existence = true;
             }else{
               console.log('does not exist')
               this.existence = false;
             }
           });

          
       }
 
      checkMarking(name,date);
      
      return this.existence;
     
    },
    checkBreak()
    {
        const name = this.$firebase.auth().currentUser.displayName;
        const date = this.$moment().format('DD-MM-YYYY');

        const checkingBreak = (name,date) => {
           const ref = this.$firebase.database().ref(`timez_attendence/${name}/${date}`);
           
           ref.on('value',(snapshot)=>{
               let data = snapshot.val();
               if(data !== null){
               if(data.hasOwnProperty('break_start'))
               {
                  this.onBreak =  true;
               }else{
                  this.onBreak =  false;
               }
               }
          })
          
        }
       
         checkingBreak(name,date);
         return this.onBreak;
    }
   },
   methods:{
       markAttendence()
       {
          const time = this.$moment().format('LTS');
          const date = this.$moment().format('DD-MM-YYYY');
          const name = this.$firebase.auth().currentUser.displayName;

           
          
          const ref = this.$firebase.database().ref(`timez_attendence/${name}/${date}`);
          
          const writeDate = (name,date,time) => {
              ref.set({
                 name:name,
                 date:date,
                 time:time,
              });
          }
          
          writeDate(name,date,time);

       },
       startBreak()
       {
          const time = this.$moment().format('LTS');
          const date = this.$moment().format('DD-MM-YYYY');
          const name = this.$firebase.auth().currentUser.displayName;
          const ref = this.$firebase.database().ref(`timez_attendence/${name}/${date}`);

          const updateAttendence = (time) => {
            ref.update({
              break_start:time     
            });
          }
          
         updateAttendence(time); 
       },
       endBreak()
       {
          const time = this.$moment().format('LTS');
          const date = this.$moment().format('DD-MM-YYYY');
          const name = this.$firebase.auth().currentUser.displayName;
          var data;
          const ref = this.$firebase.database().ref(`timez_attendence/${name}/${date}`);

          const updateAttendence = (time) => {
            ref.update({
              break_end:time     
            })
            this.onBreak = false;
          }
          
         //  updateAttendence(time);

          ref.on('value',(snapshot)=>{
             data = snapshot.val();
          });
          
         const getTimeDifference = (start,end) => {
              var s = this.$moment(start,'LTS').substract(this.$moment(end,'LTS'))
              const f = this.$moment(s).format('LTS');
              console.log(f);
              
         }

         getTimeDifference(data.break_start,data.break_end); 
       }
   }
}
</script>

