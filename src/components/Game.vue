<template>
  <div class='game-wrapper'>
      <canvas ref="game"></canvas>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

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
      'ctx'
    ])
  },
  methods: {
    ...mapMutations([
      'setContext'
    ]),
    initGame() {
      const canvas = this.$refs.game;
      this.setContext(canvas.getContext("2d"))
      canvas.width = this.width;
      canvas.height = this.height;
      this.lastTime = 0;
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
      // detect if player fails.
    },
    draw(ctx) {
      // test
      ctx.rect(0,0, this.width, this.height);
      ctx.fillStyle = "rgba(255,255,255,1)";
      ctx.fill();
      ctx.font = "32px Arial";
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.fillText("Press spacebar to start", this.width / 2, this.height / 2);
    },
  },
  mounted () {
    this.initGame();
  }
}
</script>
