class Body {
  constructor(x,y,mass,radius,color=false,parent=false) {
    this.pos = new Vector(x,y);
    this.vel = new Vector();
    this.mass = mass;
    this.radius = radius;
    this.lock = false;
    this.color = color;
    this.lifetime = 0;
    this.parent = parent;
    if(!color) {
      this.color = "#" + Math.randCol();
    }
  }

  anchor() {
    this.lock = true;
  }

  step() {
    this.lifetime++;
    this.pos.add(this.vel);
  }

  addAcceleration(x,y) {
    this.vel.x += x;
    this.vel.y += y;
  }
}
