export default class Totter {
  constructor(vue) {
    this.store = vue.$store;
    this.gameWidth = vue.$width;
    this.gameHeight = vue.$height;
    // percent to borders
    this.percentToBorder = 5;
    this.percentToBottom = 26;
    this.setDefault();
  }
  draw(ctx) {
    // draw line
    ctx.setTransform(1,0,0,1,0,0);
    ctx.globalCompositeOperation='destination-over';
    ctx.fillStyle =this.rect.color;
    // rotate using d
    ctx.translate(this.rect.center.x, this.rect.center.y); 
    ctx.rotate( (Math.PI / 180) * this.rect.degree);
    ctx.translate(-this.rect.center.x, -this.rect.center.y);
    ctx.fillRect(this.rect.x,this.rect.y,this.rect.width,this.rect.height);
    ctx.setTransform(1,0,0,1,0,0);
    // draw traingle
    ctx.strokeStyle = "#A9A9A9";
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.moveTo(this.rect.center.x, this.rect.y + 10);
    ctx.lineTo(this.rect.center.x - 150, this.gameHeight - 10);
    ctx.lineTo(this.rect.center.x + 150, this.gameHeight - 10);
    ctx.lineTo(this.rect.center.x, this.rect.y + 10);
    ctx.stroke();
    ctx.closePath();
  }
  update() {
    // deltaTime
  }
  calcuImpactZone() {
    const border = this.gameWidth / 100 * this.percentToBorder;
    const zoneWidth = (this.rect.center.x - border) / 5;
    const playerZone = [];
    const enemyZone = [];
    for(let i = 1; i <= 5; i++) {
      const pZone = {
        from: Math.floor(border + (zoneWidth * i) - zoneWidth),
        to: Math.floor(border + zoneWidth * i),
        width: zoneWidth,
        center: Math.floor(border + (zoneWidth * i) - (zoneWidth / 2)),
        currentHeight: 0,
        number: i,
        factor: Math.ceil((1.2.toFixed(1) - Number((0.2 * i).toFixed(1))) * 100) / 100,
        items: []
      }
      const enemyI = i + 5;
      const eZone = {
        from: Math.floor(border + (zoneWidth * enemyI) - zoneWidth),
        to: Math.floor(border + zoneWidth * enemyI),
        width: zoneWidth,
        center: Math.floor(border + (zoneWidth * enemyI) - (zoneWidth / 2)),
        currentHeight: 0,
        number: i,
        factor: Math.ceil((Number((0.2 * i).toFixed(1))) * 100) / 100,
        items: []
      }
      playerZone.push(pZone);
      enemyZone.push(eZone);
    }
    // need set items 
    this.store.commit("changePlayerField", playerZone);
    this.store.commit("changeEnemyField", enemyZone);
  }
  setDefault() {
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
      degree: 0
    };
    this.rect.center = {
      x: this.gameWidth / 2,
      y: this.rect.y + this.rect.height / 2
    }
    // calc all impact zones and set them
    this.calcuImpactZone();
  }
}