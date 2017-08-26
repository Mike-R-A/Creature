function setup() {
    p.createCanvas(p.windowWidth, p.windowHeight);
}

function windowResized() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
}

var creature = new Creature(p.windowWidth / 2, p.windowHeight / 2, 25, 25, [25, 37, 210], 1, [211, 185, 88], 3);

var world = new World();
world.Things = Helper.MakeNoOfFoodItems(10, world);

var isFirstTime = true;

var associationInterval;
var changeAThingInterval;

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
        associationInterval = setInterval(() => {
            creature.DoAssociating(world)
        }, 10);
        changeAThingInterval = setInterval(() => {
            var rand = Helper.RandomIntFromInterval(0, world.Things.length - 1);
            var index = world.Things.indexOf(world.Things[rand]);
            world.Things.splice(index, 1, Helper.MakeRandomFoodItem(world));
        }, 60000);
        isFirstTime = false;
    }
    creature.NormaliseAssociations();
}