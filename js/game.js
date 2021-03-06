class Game {
  constructor() {
    this.buildWorld();
    this.buildView();
    this.world.viewPortSize = this.view.size;
    this.input = new Input(this.view, this.world);
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
