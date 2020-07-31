<template>
  <v-container>
      <p class="subheading grey--text">Profile</p>
      <p class="heading">Customize Your Profile</p>
      
      <v-container class="d-flex flex-column justify-center align-center">
          <v-avatar size="150">
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                >
          </v-avatar>
          <v-file-input label="Profile Image"  prepend-icon="mdi-camera" accept="image/png, image/jpeg, image/bmp" hide-input>
          </v-file-input>
          <p class="caption">Upload Your Profile Image</p>
      </v-container>

      <v-container>
        <v-form>
            <v-layout row justify-space-between>
                <v-flex xm12 sm12 md6>
                     <v-text-field label="Username" class="mx-2" outlined dense></v-text-field> 
                </v-flex>
                <v-flex xm12 sm12 md6>
                     <v-text-field label="Phone" class="mx-2" outlined dense></v-text-field> 
                </v-flex>
            </v-layout>
            <v-layout row justify-space-between>
                <v-flex xm12 sm12 md12>
                     <v-select :items="countries" outlined dense class="mx-2" label="Location"></v-select>
                </v-flex>
            </v-layout>
         </v-form>
      </v-container>

  </v-container>
</template>

<script>
export default {
      name:'profile',
      data(){
        return{
          countries:['Pakistan','China','Russia','Turkey','Finland']
        }
      }
}
</script>

<style>

</style>