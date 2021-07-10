export default class Figure {
  constructor(vue, figure) {
    this.store = vue.$store;
    this.color =  figure.color;
    this.type = figure.type;
    this.weight = figure.weight;
    this.column = figure.column;
    this.speed = figure.speed;
    this.size = figure.size;
    this.x = figure.position.x;
    this.y = figure.position.y;
    this.gameWidth = vue.$width;
    this.gameHeight = vue.$height;
    this.disabled = false;
  }
  draw(ctx) {
    // draw line
    const degree = this.store.getters.totter.rect.degree;
    const cx = this.store.getters.totter.rect.center.x;
    const cy = this.store.getters.totter.rect.center.y;
    ctx.globalAlpha = 0.2;
    ctx.setTransform(1,0,0,1,0,0);
    ctx.globalCompositeOperation='destination-over';
    ctx.fillStyle = this.color;
    // // rotate using d
    ctx.translate(cx, cy); 
    ctx.rotate( (Math.PI / 180) * degree);
    ctx.translate(-cx, -cy); 
    if (this.type === "square") {
      ctx.fillRect(this.x,this.y,this.size,this.size);  
    } else if (this.type === "circle") {
      ctx.beginPath();
      ctx.arc(this.column.center, this.y + (this.size / 2), this.size / 2, 0, 2 * Math.PI);
      ctx.fill();
    } else if (this.type === "traingle") {
      ctx.beginPath();
      ctx.moveTo(this.column.center, this.y);
      ctx.lineTo(this.x,this.y + this.size);
      ctx.lineTo(this.x + this.size,this.y + this.size);
      ctx.lineTo(this.column.center, this.y);
      ctx.fill();
    }
    // ctx.fillRect(this.x,this.y,this.size,this.size);
    ctx.globalAlpha = 1;
    ctx.font = "14px Arial";
    ctx.fillText(`${this.weight} kg`, this.column.center - 10, this.y + (this.size / 2) + 6);
    ctx.setTransform(1,0,0,1,0,0);
  }
  update() {
    if (this.disabled) {
      return null;
    }
    this.y += this.speed;
    // detect impact
    const figureBottom = this.y + this.size;
    const totterTop = this.store.getters.totter.rect.y - this.column.currentHeight;
    if (figureBottom >= totterTop) {
      this.y = totterTop - this.size;
      this.stop();
      if (this.store.getters.turn === "player") {
        this.store.commit("changeTurn", "enemy");
      } else {
        this.store.commit("changeTurn", "player");
      }
    } 
  }
  changeColumn(column) {
    this.column = column;
    this.x = column.center - (this.size / 2);
  }
  moveLeft() {
    if (this.column.number === 1) {
      return null;
    } else {
      const column = this.store.getters.playerField[this.column.number - 2];
      this.changeColumn(column)
    }
  }
  moveRight() {
    if (this.column.number === 5) {
      return null;
    } else {
      const column = this.store.getters.playerField[this.column.number]
      this.changeColumn(column)
    }
  }
  fastMode(value) {
    if (value) {
      this.speed = 5;
    } else {
      this.speed = this.store.getters.gameSpeed;
    }
  }
  stop() {
    this.speed = 0;
    this.disabled = true;
  }
}