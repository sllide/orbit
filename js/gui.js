class Gui {
  constructor(world, width, height) {
    this.width = width;
    this.height = height;
    this.world = world;
  }

  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "20px 'Ubuntu'";
    ctx.textBaseline = "top";
    let lineWidth = ctx.measureText(this.world.level);
    ctx.fillText(this.world.level,this.width/2-lineWidth.width/2,5);
    if(this.world.counter>0) {
      lineWidth = ctx.measureText(Math.floor(this.world.counter/60));
      ctx.fillText(Math.floor(this.world.counter/60),this.width/2-lineWidth.width/2,25);
    }

    if(this.world.gameover) {
      ctx.font = "40px 'Ubuntu'"
      lineWidth = ctx.measureText("GAME        OVER");
      ctx.fillText("GAME        OVER",this.width/2-lineWidth.width/2-5,this.height/2-20);
    }
  }
}
