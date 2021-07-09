import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    ctx: null,
    gameState: 0,
    totter: {},
    playerItems: [],
    enemyItems: []
  },
  getters: {
    ctx(state) {
       return state.ctx; 
    },
    gameState(state) {
      return state.gameState;
    },
    totter(state) {
      return state.totter;
    },
    playerItems(state) {
      return state.playerItems;
    },
    enemyItems(state) {
      return state.enemyItems;
    }
  },
  mutations: {
    setContext(state, context) {
      state.ctx = context;
    },
    changeGameState(state, value) {
      state.gameState = value;
    },
    changeTotter(state, totter) {
      state.totter = totter;
    },
    changePlayerItems(state, array) {
      state.playerItems = array;
    },
    changeEnemyItems(state, array) {
      state.enemyItems = array;
    }
  },
})