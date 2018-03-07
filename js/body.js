class Body {
  constructor(x,y,mass,color=false) {
    this.pos = new Vector(x,y);
    this.vel = new Vector();
    this.mass = mass;
    this.lock = false;
    this.color = color;
    if(!color) {
      this.color = "#" + Math.randCol();
    }
  }

  anchor() {
    this.lock = true;
  }

  step() {
    this.pos.add(this.vel);
  }

  addAcceleration(x,y) {
    this.vel.x += x;
    this.vel.y += y;
  }
}
