function setup() {
    p.createCanvas(p.windowWidth, p.windowHeight);
}

function windowResized() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
}

var creature = new Creature(20, 20, 25, 25, [25, 37, 210], 1, [34, 132, 19], 3);

var world = new World();
world.Things = Helper.MakeNoOfFoodItems(15);

var isFirstTime = true;

var interval;

function draw() {
    world.draw();
    world.Things.forEach(t => {
        t.move(Helper.RandomIntFromInterval(-1, 1), Helper.RandomIntFromInterval(-1, 1));
        t.draw();
    });
    creature.sniff(world);
    Helper.GraphSmell(creature.whatICanSmell);
    Helper.GraphWellbeing(creature.wellbeing);
    Helper.GraphAssociations(creature.associations);
    creature.x = p.mouseX;
    creature.y = p.mouseY;
    creature.draw();
    world.eatThingsInEdibleReach(creature);

    creature.wellbeing = creature.wellbeing - 0.01;

    if (isFirstTime) {
        interval = setInterval(() => {
            creature.DoAssociating(world)
        }, 10);
        isFirstTime = false;
    }
}