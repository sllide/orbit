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
  }

  fire(sx,sy,ex,ey) {
    let body = new Body(sx-this.viewPortSize.x/2,sy-this.viewPortSize.y/2,10);
    body.addAcceleration(-(ex-sx)/50,-(ey-sy)/50);
    this.bodies.push(body);
  }

  step(rt) {
    this.updateBodyAcceleration();
    this.updateBodyPosition();
    this.checkBodyCollision();
    this.updateParticles();
    this.calculatePath();
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
        let p = new Body(b.pos.x,b.pos.y,3,b.color,b);
        p.addAcceleration(b.vel.x,b.vel.y);
        this.particles.push(p);
      }
    }
  }

  spawnExplosion(b) {
    let p;
    let x;
    let y;
    let xVel;
    let yVel;
    for(var i=0;i<50;i++) {
      x = b.pos.x + Math.random()*10-5;
      y = b.pos.y + Math.random()*10-5;
      xVel = b.vel.x + Math.random()/2;
      yVel = b.vel.y + Math.random()/2;
      p = new Body(x,y,3,b.color,b);
      p.addAcceleration(xVel,yVel);
      this.particles.push(p);
    }
  }

  checkBodyCollision() {
    let removal = Array();
    for (let b of this.bodies) {
      var done = false;
      if(!b.lock && !done) {
        for (let tb of this.bodies) {
          if(b !== tb) {
            let dist = b.pos.length(tb.pos);
            if(b.mass+tb.mass>dist) {
              this.spawnExplosion(b);
              removal.push(b);
              if(!tb.lock) {
                this.spawnExplosion(tb);
                removal.push(tb);
                done = true;
                break;
              }
            }
          }
        }
      }
    }

    for(let r of removal) {
      let index = this.bodies.indexOf(r);
      if(index>-1) {
        this.bodies.splice(index,1);
      }
    }
  }

  updateParticles() {
    for (let p of this.particles) {
      for (let b of this.bodies) {
          if(p.parent && b !== p.parent) {
            let dist = p.pos.length(b.pos);
            let rot = Math.atan2(b.pos.x - p.pos.x, b.pos.y - p.pos.y);
            let att = G * (((p.mass*10000) * (b.mass*10000))/dist);
            p.addAcceleration(Math.sin(rot)*att,Math.cos(rot)*att);
          }
      }
    }

    let removal = Array();
    for (let p of this.particles) {
      p.step();
      if(p.lifetime>255) {
        removal.push(p);
      }
    }

    //destroy particles where needed
    let index;
    for(let r of removal) {
      index = this.particles.indexOf(r);
      this.particles.splice(index,1);
    }
  }

  setPath(sx,sy,ex,ey) {
    this.sx = sx;
    this.sy = sy;
    this.ex = ex;
    this.ey = ey;
  }
  
  calculatePath() {
    if(this.sx<0||this.sy<0) return;
    let path = Array();
    let b = new Body(this.sx-this.viewPortSize.x/2,this.sy-this.viewPortSize.y/2,10);
    b.addAcceleration(-(this.ex-this.sx)/50,-(this.ey-this.sy)/50);
    for(let i=0;i<500;i++) {
      for(let tb of this.bodies) {
        let dist = tb.pos.length(b.pos);
        let rot = Math.atan2(tb.pos.x - b.pos.x, tb.pos.y - b.pos.y);
        let att = G * (((b.mass*10000) * (tb.mass*10000))/dist);
        b.addAcceleration(Math.sin(rot)*att,Math.cos(rot)*att);
      }
      b.step();
      path.push([b.pos.x,b.pos.y]);
    }
    this.path = path;
  }

  getScore() {
    if(!this.score) this.score = 0;
    return this.score++;
  }
}
