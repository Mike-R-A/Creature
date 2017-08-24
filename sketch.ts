
var p = new p5();

class Drawable {
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
        p.ellipse(this.x,this.y,this.width,this.height);
    }
}

class Thing extends Drawable {   
    smell: number[];
}
class Creature extends Thing{
    associations: number[];
    wellbeing: number;   
}

function setup() {
    p.createCanvas(p.windowWidth, p.windowHeight);
}

function windowResized() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
}

var creature = new Creature();
creature.x=20;
creature.y=20;
creature.stroke=[0,0,0];
creature.fill=[50,0,0];
creature.strokeWeight=1;
creature.width=20;
creature.height=20;

function draw() {
    p.background(100);
    creature.draw();
}