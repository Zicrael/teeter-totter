<template>
  <div id="app">
    <Game/>
  </div>
</template>

<script>
import Game from './components/Game.vue'

export default {
  name: 'App',
  components: {
    Game
  }
}
</script>
<style>
html, body {
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
  border: 1px solid #000;
}
img {
  display: none;
}
</style>
