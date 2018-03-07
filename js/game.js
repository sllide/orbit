class Game {
  constructor() {
    this.buildWorld();
    this.buildView();
  }

  buildWorld() {
    this.world = new World();
  }

  buildView() {
    this.view = new View(360, this.world);
    document.body.append(this.view.getCanvas());
  }

  loop(rt) {
    this.world.step();
    this.view.draw();
    requestAnimationFrame(this.loop.bind(this));
  }
}
