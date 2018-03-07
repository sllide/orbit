class Vector {
  constructor(x=0,y=0) {
    this.x = x;
    this.y = y;
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  sub(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
  }

  length(vector) {
    var a = Math.abs(this.x - vector.x);
    var b = Math.abs(this.y - vector.y);
    return Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
  }

  direction(vector) {
    var vec = new Vector();
    vec.x = vector.x;
    vec.y = vector.y;
    vec.sub(this);
    vec.x / this.length(vec);
    vec.y / this.length(vec);
    return vec;
  }

  clone() {
    return new Vector(this.x,this.y);
  }
}
