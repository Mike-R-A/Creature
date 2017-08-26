function setup() {
    p.createCanvas(p.windowWidth, p.windowHeight);
}

function windowResized() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
}

var creature = new Creature(p.windowWidth / 2, p.windowHeight / 2, 25, 25, [25, 37, 210], 1, [34, 132, 19], 3);

var world = new World();
world.Things = Helper.MakeNoOfFoodItems(20, world);

var isFirstTime = true;

var interval;

function draw() {
    world.draw();
    world.Things.forEach(t => {
        var xChange = t.x - t.lastX;
        var yChange = t.y - t.lastY;
        t.move(Helper.RandomIntFromInterval(-1, 200) * xChange + Helper.RandomIntFromInterval(-1, 1),
            Helper.RandomIntFromInterval(-1, 200) * yChange + Helper.RandomIntFromInterval(-1, 1));
        t.draw();
    });
    creature.sniff(world);
    Helper.GraphSmell(creature.whatICanSmell);
    Helper.GraphWellbeing(creature.wellbeing);
    Helper.GraphAssociations(creature.associations);
    Helper.GraphDesireForSmell(creature.desireForSmell);
    Helper.GraphGoodness(world.goodness);
    creature.DecideWhereToMove();
    creature.draw();
    world.eatThingsInEdibleReach(creature);

    creature.wellbeing = creature.wellbeing - 0.05;

    if (isFirstTime) {
        interval = setInterval(() => {
            creature.DoAssociating(world)
        }, 10);
        isFirstTime = false;
    }
    creature.NormaliseAssociations();
}