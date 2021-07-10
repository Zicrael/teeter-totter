export default class InputHandler {
  constructor(vue) {
    this.store = vue.$store;
    this.mapState = vue.$mapState;
    document.addEventListener("keydown", event => {
      switch(event.key) {
        case "Enter":
          this.handleEnter();
          break;
        case "ArrowLeft":
          this.handleLeft();
          break;
        case "ArrowRight":
          this.handleRight();
          break;
        case "ArrowDown":
          this.handleDown();
          break;
        case "Escape":
          this.handleEscape();
          break;
      }
    });
    document.addEventListener("keyup", event => {
      switch(event.key) {
        case "ArrowDown":
          this.handleDownKeyup();
          break;
      }
    });
  }
  handleLeft() {
    if (this.store.getters.turn === "player") {
      this.store.getters.activeFigure.moveLeft();
    }
  }
  handleRight() {
    if (this.store.getters.turn === "player") {
      this.store.getters.activeFigure.moveRight();
    }
  }
  handleDown() {
    if (this.store.getters.turn === "player") {
      this.store.getters.activeFigure.fastMode(true);
    }
  }
  handleDownKeyup() {
    if (this.store.getters.turn === "player") {
      this.store.getters.activeFigure.fastMode(false);
    }
  }
  handleEnter() {
    const gameState = this.store.getters.gameState;
    if (gameState === this.mapState.playing) {
      // prevent handling if play
      return null;
    }
    if (gameState === this.mapState.menu) {
      // if menu
      this.store.commit("changeGameState", this.mapState.playing);
    }
    if (gameState === this.mapState.paused) {
      // if paused
      this.store.commit("changeGameState", this.mapState.playing);
    }
    if (gameState === this.mapState.gameover) {
      // if gameover
      location.reload();
    }
    if (gameState === this.mapState.gamewin) {
      // if gamewin
      location.reload();
    }
  }
  handleEscape() {
    const gameState = this.store.getters.gameState;
    // prevent handling if paused
    if (gameState === this.mapState.paused) {
      return null;
    }
    // if playing
    if (gameState === this.mapState.playing) {
      this.store.commit("changeGameState", this.mapState.paused);
    }
  }
}