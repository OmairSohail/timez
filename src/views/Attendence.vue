<template>
  <v-app>
     <v-container class="d-flex flex-row justify-space-between align-items-center">
        <span class="text-h2"><digital-clock :blink="true" :twelveHour="true" class=""/></span> 
        <v-btn color="teal" dark @click="markAttendence()" v-if="!existence">
              <v-icon left>mdi-pencil</v-icon>
               Mark
        </v-btn>
        <v-btn color="teal" @click="startBreak()" dark  v-if="existence" large>
              <v-icon left>mdi-food-fork-drink</v-icon>
               Start Break
        </v-btn>  
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
               if(data.hasOwnProperty('break_start'))
               {
                  this.onBreak =  true;
               }else{
                  this.onBreak =  false;
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
       }
   }
}
</script>

