import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    ctx: null,
    gameState: 0,
    gameSpeed: 1,
    totter: {},
    playerField: [],
    enemyField: [],
    playerStats: {
      weight: 0,
      impact: 0
    },
    enemyStats: {
      weight: 0,
      impact: 0
    },
    activeFigure: null,
    turn: "player"
  },
  getters: {
    ctx(state) {
       return state.ctx; 
    },
    gameState(state) {
      return state.gameState;
    },
    gameSpeed(state) {
      return state.gameSpeed;
    },
    totter(state) {
      return state.totter;
    },
    playerField(state) {
      return state.playerField;
    },
    enemyField(state) {
      return state.enemyField;
    },
    playerStats(state) {
      return state.playerStats;
    },
    enemyStats(state) {
      return state.enemyStats;
    },
    activeFigure(state) {
      return state.activeFigure;
    },
    turn(state) {
      return state.turn;
    }
  },
  mutations: {
    setContext(state, context) {
      state.ctx = context;
    },
    changeGameState(state, value) {
      state.gameState = value;
    },
    changeGameSpeed(state, value) {
      state.gameSpeed = value;
    },
    changeTotter(state, totter) {
      state.totter = totter;
    },
    changePlayerField(state, field) {
      state.playerField = field;
    },
    changeEnemyField(state, field) {
      state.enemyField = field;
    },
    changePlayerStats(state, stats) {
      state.playerStats = stats;
    },
    changeEnemyStats(state, stats) {
      state.enemyStats = stats;
    },
    changeActiveFigure(state, figure) {
      state.activeFigure = figure;
    },
    changeTurn(state, turn) {
      state.turn = turn;
    }
  }
})