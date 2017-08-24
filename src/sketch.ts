function setup() {
    p.createCanvas(p.windowWidth, p.windowHeight);
}

function windowResized() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
}

var creature = new Creature(20,20,25,50,[25,37,210],1,[34,132,19]);

var food1 = new Thing(50,200,60,60,[25,67,233],10,[255,5,2]);

function draw() {
    p.background(100);
    creature.draw();
    food1.draw();
}