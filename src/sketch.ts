function setup() {
    p.createCanvas(p.windowWidth, p.windowHeight);
}

function windowResized() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
}

var creature = new Creature(20,20,25,25,[25,37,210],1,[34,132,19]);

var world = new World();
world.Things = Helper.MakeNoOfFoodItems(20);

function draw() {
    world.draw();
    world.Things.forEach(t => {
        t.move(Helper.RandomIntFromInterval(-1,1),Helper.RandomIntFromInterval(-1,1));
        t.draw();     
    });
    creature.sniff(world);
    Helper.GraphSmell(creature.whatICanSmell);
    Helper.GraphWellbeing(creature.wellbeing);
    creature.x = p.mouseX;
    creature.y = p.mouseY;
    creature.draw();
    world.eatThingsInEdibleReach(creature);
    if(creature.wellbeing >= 1){
        creature.wellbeing = creature.wellbeing-0.2;
    }
}