import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:[]
  },
  mutations: {
    fillUser(state,payload){
       this.state.user = payload;
    },
    insertImage(state,payload){
       this.state.user.photo = payload;
    },
    emptyUser(state){
       this.state.user = [];
    } 
  },
  actions: {
    createUser:({commit},payload) => {
        commit('fillUser',payload)
    },
    updatePhoto: ({commit},payload)=>{
        commit('insertImage',payload);
    },
    deleteUser:({commit}) => {
       commit('emptyUser');
    }
  },
  modules: {
  }
})
