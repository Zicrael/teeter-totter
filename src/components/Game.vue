<template>
  <div class='game-wrapper'>
    <canvas ref="game"></canvas>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import InputHandler from "../classes/InputHandler.js";
import Totter from "../classes/Totter.js";

export default {
  name: 'Game',
  data () {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      deltaTime: null,
      lastTime: null
    }
  },
  computed: {
    ...mapGetters([
      'ctx',
      'gameState',
      'totter',
      'playerItems',
      'enemyItems'
    ])
  },
  methods: {
    ...mapMutations([
      'setContext',
      'changeGameState',
      'changeTotter'
    ]),
    initGame() {
      const canvas = this.$refs.game;
      this.setContext(canvas.getContext("2d"))
      canvas.width = this.width;
      canvas.height = this.height;
      this.lastTime = 0;
      new InputHandler(this);
      this.changeTotter(new Totter(this));
      requestAnimationFrame(this.gameLoop);
    },
    gameLoop(timestamp) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.update(deltaTime);
        this.draw(this.ctx);
        requestAnimationFrame(this.gameLoop);
    },
    update() {
      const gameFail = false;
      if (gameFail) {
        // if totter fall
        this.changeGameState(this.$mapState.gameover);
      } else if (this.gameState !== this.$mapState.playing) {
        // if paused or menu
        return null;
      } else {
        // this.totter.rect.d = this.totter.rect.d + 1;
        // console.log("update!")
        // update game
      }
    },
    draw() {
      if (this.gameState === this.$mapState.menu) {
        // dont draw if on menu
        return null;
      } else {
        const objects = [this.totter, ...this.playerItems, ...this.enemyItems];
        objects.forEach(object => object.draw(this.ctx));
      }
    },
  },
  mounted () {
    this.initGame();
  }
}
</script>
