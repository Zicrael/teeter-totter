<template>
  <div id="app">
    <Game/>
    <Menu/>
    <Pause/>
  </div>
</template>
<script>
import Game from './components/Game.vue'
import Menu from './components/Menu.vue'
import Pause from './components/Pause.vue'

export default {
  name: 'App',
  components: {
    Game,
    Menu,
    Pause
  },
}
</script>
<style lang="scss">
html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0px;
  border: 0;
  overflow: hidden; /*  Disable scrollbars */
  display: block;  /* No floating content on sides */
}
.game-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
canvas {
  border: 10px solid #000;
}
.menu-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-family: cursive;
}
img:not(.menu-gif) {
  display: none;
}
</style>
