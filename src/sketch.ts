

function setup() {
    p.createCanvas(p.windowWidth, p.windowHeight);
}

function windowResized() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
}

var creature = new Creature();
creature.x=20;
creature.y=20;
creature.stroke=25;
creature.fill=50;
creature.strokeWeight=1;
creature.width=50;
creature.height=20;

function draw() {
        p.background(100);
        creature.draw();
}