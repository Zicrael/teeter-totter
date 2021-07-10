<template>
  <div class='game-wrapper'>
    <div class="game-stats" v-if="gameState === 1">
      <div>
        <div>Weight: {{playerStats.weight}}</div>  
        <div>Impact: {{playerStats.impact}}</div>
      </div>
      <div>
        <span v-if="turn === 'player'">Your turn</span>
        <span v-else>Enemy turn</span>
      </div>
      <div>
        <div>Weight: {{enemyStats.weight}}</div>
        <div>Impact: {{enemyStats.impact}}</div>   
      </div>
    </div>
    <canvas ref="game"></canvas>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import InputHandler from "../classes/InputHandler.js";
import Totter from "../classes/Totter.js";
import Figure from "../classes/Figure.js";

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
      'gameSpeed',
      'totter',
      'playerField',
      'enemyField',
      'playerStats',
      'enemyStats',
      'activeFigure',
      "turn"
    ])
  },
  methods: {
    ...mapMutations([
      'setContext',
      'changeGameState',
      'changeGameSpeed',
      'changeTotter',
      'changeActiveFigure',
      'changePlayerStats',
      'changeEnemyStats',
      'changeTurn'
    ]),
    initGame() {
      const canvas = this.$refs.game;
      this.setContext(canvas.getContext("2d"))
      canvas.width = this.width;
      canvas.height = this.height;
      this.lastTime = 0;
      new InputHandler(this);
      this.changeTotter(new Totter(this));
      this.createRandomFigure();
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
      const gameFail = this.totter.rect.degree <= -20;
      const gameWin = this.totter.rect.degree >= 20;
      if (gameFail) {
        // if totter fall on player side
        this.changeGameState(this.$mapState.gameover);
      } else if (gameWin) {
         // if totter fall on enemy side
        this.changeGameState(this.$mapState.gamewin);
      } else if (this.gameState !== this.$mapState.playing) {
        // if paused or menu
        return null;
      } else {
        const figures = [];
        this.playerField.map(zone => zone.items.map(item => figures.push(item)));
        this.enemyField.map(zone => zone.items.map(item => figures.push(item)));
        // merge and draw
        const objects = [this.totter, this.activeFigure, ...figures];
        objects.forEach(object => object.update(this.ctx));
      }
    },
    draw() {
      if (this.gameState === this.$mapState.menu) {
        // stop draw if on menu
        return null;
      } else if(this.gameState === this.$mapState.gameover) {
        return null;
      } else if(this.gameState === this.$mapState.gamewin) {
        return null;
      } else {
        const figures = [];
        // get all figures
        this.playerField.map(zone => zone.items.map(item => figures.push(item)));
        this.enemyField.map(zone => zone.items.map(item => figures.push(item)));
        // merge and draw
        const objects = [this.totter, this.activeFigure, ...figures];
        objects.forEach(object => object.draw(this.ctx));
      }
    },
    createRandomFigure() {
      let column;
      let speed;
      const types = ["square", "circle", "traingle"];
      if (this.turn === "player") {
        column = this.playerField[Math.floor(Math.random() * 5)];
        speed = this.gameSpeed;
      } else {
        column = this.enemyField[Math.floor(Math.random() * 5)];
        speed = 5;
      }
      const figure = {
        color: ('#'+Math.floor(Math.random()*16777215).toString(16)),
        type: types[Math.floor(Math.random() * 3)],
        weight: Math.floor(Math.random() * 10) + 1,
        column,
        speed
      }
      // calc figure size
      figure.size = Math.floor((column.width - 60) / 10) * figure.weight + 60;
      // calc position
      figure.position = {
        x: column.center - (figure.size / 2),
        y: 0 - figure.size
      }
      this.changeActiveFigure(new Figure(this, figure));
    },
    calcTurnResults(turn) {
      const column = this.activeFigure.column;
      const weight = this.activeFigure.weight;
      // push item to column before delete
      column.items.push(this.activeFigure);
      // calc column height
      column.currentHeight = column.currentHeight + this.activeFigure.size;
      // clear active figure
      this.changeActiveFigure(null);
      // calc totter impact
      this.calcTotterImpact(column, weight, turn);
      // increase speed if not limited
      if (this.gameSpeed !== 5 && turn === "player") {
        this.changeGameSpeed(this.gameSpeed + 0.1);
      }
      // create next figure
      this.createRandomFigure();
    },
    calcTotterImpact(column, weight, turn) {
      // calc weight and impact
      const impact = Number((Math.ceil((weight * column.factor) * 100) / 100).toFixed(1));
      if (turn === "player") {
        this.changeEnemyStats({
          weight: this.enemyStats.weight + weight,
          impact: Math.ceil((this.enemyStats.impact + impact) * 100) / 100
        })
      } else {
        this.changePlayerStats({
          weight: this.playerStats.weight + weight,
          impact: Math.ceil((this.playerStats.impact + impact) * 100) / 100
        })
      }
      // change totter degree
      const diff = this.enemyStats.impact - this.playerStats.impact;
      this.totter.rect.degree = Math.ceil(diff * 100) / 100;
    }
  },
  watch: {
    turn(value) {
      this.calcTurnResults(value);
    }
  },
  mounted () {
    this.initGame();
  }
}
</script>
<style lang="scss" scoped>
.game-stats {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 28px;
  font-family: cursive;
  padding: 10px;
}
</style>