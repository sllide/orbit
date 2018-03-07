const G = 6.67300E-11;

class World {
  constructor() {
    this.bodies = Array();
    this.particles = Array();
    this.createCenter();
  }

  createCenter() {
    let body = new Body(0,0,30);
    body.anchor();
    this.bodies.push(body);
    body = new Body(0,-100,10);
    body.addAcceleration(1.5,0);
    this.bodies.push(body);
    body = new Body(0,100,10);
    body.addAcceleration(-1.5,0);
    this.bodies.push(body);
    body = new Body(150,0,10);
    body.addAcceleration(0,-1.5);
    this.bodies.push(body);
    body = new Body(0,200,10);
    body.addAcceleration(1.5,0);
    this.bodies.push(body);
  }

  step(rt) {
    this.updateBodyAcceleration();
    this.updateBodyPosition();
    this.updateParticles();
  }

  updateBodyAcceleration() {
    for (let b of this.bodies) {
      if(!b.lock) {
        for (let tb of this.bodies) {
          if(b !== tb) {
            let dist = b.pos.length(tb.pos);
            let rot = Math.atan2(tb.pos.x - b.pos.x, tb.pos.y - b.pos.y);
            let att = G * (((b.mass*10000) * (tb.mass*10000))/dist);
            b.addAcceleration(Math.sin(rot)*att,Math.cos(rot)*att);
          }
        }
      }
    }
  }

  updateBodyPosition() {
    for (let b of this.bodies) {
      if(!b.lock) {
        b.step();
        let p = new Body(b.pos.x-1,b.pos.y-1,2,b.color);
        p.addAcceleration(b.vel.x,b.vel.y);
        this.particles.push(p);
      }
    }
  }

  updateParticles() {
    for (let p of this.particles) {
      for (let b of this.bodies) {
          let dist = p.pos.length(b.pos);
          let rot = Math.atan2(b.pos.x - p.pos.x, b.pos.y - p.pos.y);
          let att = G * (((p.mass*10000) * (b.mass*10000))/dist);
          p.addAcceleration(Math.sin(rot)*att,Math.cos(rot)*att);
      }
    }

    for (let p of this.particles) {
      p.step();
    }

    //cap particle count
    let cap = 400;
    if(this.particles.length>cap) {
      this.particles = this.particles.splice(-cap, cap);
    }
  }
  
  getScore() {
    if(!this.score) this.score = 0;
    return this.score++;
  }
}
