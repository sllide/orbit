class View {
  constructor(width, world) {
    this.size = new Vector(width,width/9*16);    
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.size.x;
    this.canvas.height = this.size.y;

    this.world = world;

    this.gui = new Gui(this.world, this.size.x, this.size.y);
  }

  draw() {
    let ctx = this.canvas.getContext('2d');
    this.clearScreen(ctx);
    this.drawWorld(ctx);
    this.gui.draw(ctx);
  }

  clearScreen(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,this.size.x,this.size.y);
  }

  drawWorld(ctx) {
    this.drawParticles(ctx);
    this.drawBodies(ctx);
  }

  drawBodies(ctx) {
    for (let b of this.world.bodies) {
      let x = b.pos.x + this.size.x/2;
      let y = b.pos.y + this.size.y/2;
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.arc(x,y,b.mass,0,2*Math.PI);
      ctx.fill();
    }
  }

  drawParticles(ctx) {
    for (let p of this.world.particles) {
      let x = p.pos.x + this.size.x/2;
      let y = p.pos.y + this.size.y/2;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(x,y,p.mass,0,2*Math.PI);
      ctx.fill();
    }
  }

  getCanvas() {
    return this.canvas;
  }
}
