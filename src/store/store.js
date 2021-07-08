import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    ctx: null
  },
  getters: {
    ctx(state) {
       return state.ctx; 
    }
  },
  mutations: {
    setContext(state, context) {
      state.ctx = context;
    }
  },
})