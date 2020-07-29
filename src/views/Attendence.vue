<template>
  <v-app>
     <v-container class="d-flex flex-row justify-space-between">
        <span class="text-h2"><digital-clock :blink="true" :twelveHour="true" class=""/></span> 
        <v-btn color="teal" dark class="">
              <v-icon left>mdi-pencil</v-icon>
               Mark
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
          
       }
   },
   computed:{
    
   },
   methods:{
       
   }
}
</script>

