class Drawable {
    constructor(x: number, y: number, width: number, height: number, 
        stroke: number[], strokeWeight: number, fill: number[]){
        this.x = x;
        this.y = y;
        this.stroke = stroke;
        this.strokeWeight = strokeWeight;
        this.fill = fill;
        this.width = width;
        this.height = height;
    };
    x: number;
    y: number;
    stroke: number[];
    strokeWeight: number;
    fill: number[];
    width: number;
    height: number;
    draw(){
        p.stroke(this.stroke);
        p.strokeWeight(this.strokeWeight);
        p.fill(this.fill);
        p.rect(this.x, this.y, this.width, this.height);
    }
}