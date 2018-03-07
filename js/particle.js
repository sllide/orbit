class Particle {
  constructor(x,y,color) {
    this.pos = new Vector(x,y);
    this.color = color;
    this.runtime = 0;
  }

  step() {
    this.runtime++;
  }

  done() {
    return this.runtime > 120;
  }
}
