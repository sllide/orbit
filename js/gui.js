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
    let lineWidth = ctx.measureText(this.world.getScore());
    ctx.fillText(this.world.getScore(),this.width/2-lineWidth.width/2,5);
  }
}
