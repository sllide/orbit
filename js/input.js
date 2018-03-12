class Input {
  constructor(view, world) {
    this.view = view;
    let canvas = this.view.getCanvas();
    this.bounds = this.view.getCanvas().getBoundingClientRect();
    this.world = world;
    canvas.addEventListener('mouseup', this.mouseUp.bind(this));
    canvas.addEventListener('mousemove', this.mouseMove.bind(this));
    canvas.addEventListener('mousedown', this.mouseDown.bind(this));
    this.startX = -1;
    this.startY = -1;
  }

  mouseDown(e) {
    this.startX = e.clientX - this.bounds.left;
    this.startY = e.clientY - this.bounds.top;
  }

  mouseMove(e) {
    if(this.startX<0 || this.startY<0) { return; }
    let endX = e.clientX - this.bounds.left;
    let endY = e.clientY - this.bounds.top;

  }

  mouseUp(e) {
    let endX = e.clientX - this.bounds.left;
    let endY = e.clientY - this.bounds.top;
    this.world.fire(this.startX,this.startY,endX,endY);
    this.startX = -1;
    this.startY = -1;
  }
}
