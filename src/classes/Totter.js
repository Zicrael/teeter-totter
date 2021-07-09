export default class Totter {
  constructor(vue) {
    this.store = vue.$store;
    this.gameWidth = vue.$width;
    this.gameHeight = vue.$height;
    // percent to borders
    this.percentToBorder = 5;
    this.percentToBottom = 26;
    // position
    this.rect = {
      color: "#966F33",
      // x
      x: this.gameWidth / 100 * this.percentToBorder,
      // y
      y: (this.gameHeight - this.gameHeight / 100 * this.percentToBottom),
      // width
      width: this.gameWidth - (this.gameWidth / 100 * (this.percentToBorder * 2)),
      // height
      height: 30,
      // rotate degrees
      d: 0
    };
  }
  draw(ctx) {
    // draw line
    ctx.setTransform(1,0,0,1,0,0);
    ctx.globalCompositeOperation='destination-over';
    ctx.fillStyle =this.rect.color;
    // rotate using d
    const cx = this.gameWidth / 2 + this.rect.height / 2;   // x of shape center
    const cy = this.rect.y + this.rect.height / 2;  // y of shape center
    ctx.translate(cx, cy); 
    ctx.rotate( (Math.PI / 180) * this.rect.d);
    ctx.translate(-cx, -cy);
    ctx.fillRect(this.rect.x,this.rect.y,this.rect.width,this.rect.height);
    ctx.setTransform(1,0,0,1,0,0);
    // draw traingle
    ctx.strokeStyle = "#A9A9A9";
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.moveTo(this.gameWidth / 2 + 10, this.rect.y + 10);
    ctx.lineTo(this.gameWidth / 2 - 150, this.gameHeight - 10);
    ctx.lineTo(this.gameWidth / 2 + 150, this.gameHeight - 10);
    ctx.lineTo(this.gameWidth / 2 + 10, this.rect.y + 10);
    ctx.stroke();
    ctx.closePath();
  }
  update() {
    // console.log(deltaTime);
  }
}