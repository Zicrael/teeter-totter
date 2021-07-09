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
  }
  handleLeft() {

  }
  handleRight() {

  }
  handleDown() {

  }
  handleEnter() {
    const gameState = this.store.getters.gameState;
    // prevent handling if play
    if (gameState === this.mapState.playing) {
      return null;
    }
    // if menu
    if (gameState === this.mapState.menu) {
      this.store.commit("changeGameState", this.mapState.playing);
    }
    // if paused
    if (gameState === this.mapState.paused) {
      this.store.commit("changeGameState", this.mapState.playing);
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