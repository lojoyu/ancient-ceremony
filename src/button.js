export default class Button {
  
  constructor(p, inX, inY, w, h, inImg) {
    this.p = p;
    this.x = inX;
    this.y = inY;
    this.w = w;
    this.h = h;
    this.img = inImg;
  }
  
  draw(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.p.image(this.img, x, y, w, h);
  }
  
  // over automatically matches the width & height of the image read from the file
  // see this.img.width and this.img.height below
  over(point) {
    console.log(point.x, point.y)
    if (point.x > this.x - this.w/2 && point.x < this.x + this.w/2 && point.y > this.y - this.h/2 && point.y < this.y + this.h/2) {
      return true;
    } else {
      return false;
    }
  }
}