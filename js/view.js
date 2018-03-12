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
    this.drawPath(ctx);
  }

  drawBodies(ctx) {
    ctx.globalAlpha = 1;
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
      ctx.globalAlpha = (255-p.lifetime)/255;
      ctx.beginPath();
      ctx.arc(x,y,p.mass,0,2*Math.PI);
      ctx.fill();
    }
  }

  drawPath(ctx) {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.globalAlpha = 1;
    if(this.world.path) {
      ctx.beginPath();
      for(let p of this.world.path) {
        let x = p[0] + this.size.x/2;
        let y = p[1] + this.size.y/2;
        ctx.lineTo(x,y);
      }
      ctx.stroke();
    }
  }

  getCanvas() {
    return this.canvas;
  }
}
