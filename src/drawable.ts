class Drawable {
    x: number;
    y: number;
    stroke: number;
    strokeWeight: number;
    fill: number;
    width: number;
    height: number;
    draw(){
        p.stroke(this.stroke);
        p.strokeWeight(this.strokeWeight);
        p.fill(this.fill);
        p.rect(this.x, this.y, this.width, this.height);
    }
}