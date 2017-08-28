function setup() {
    p.createCanvas(p.windowWidth, p.windowHeight);
}

function windowResized() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
}

var world = new World();
world.NoOfSmellTypes = 5;
var noOfCreatures = 4;
var creatures: Creature[] = [];
world.Things = Helper.MakeNoOfFoodItems(10, world);
var creatureForStats: Creature;
for (var i = 0; i < noOfCreatures; i++) {
    var creature = Helper.MakeARandomCreature();
    if (i == 0) {
        creatureForStats = creature;
        creature.fill = [244, 229, 255];
    }
}

var isFirstTime = true;

var aThingDiesInterval;

var thingPathLength = 20;

function draw() {
    world.draw();
    Helper.MoveThingsOnRandomPaths(world, thingPathLength);
    world.Things.forEach(c => {
        if (c instanceof Creature) {
            c.LiveTheNextMoment(world);
            c.wellbeing = c.wellbeing - 0.01;// * (1 + Math.abs(c.idealWellbeing - c.wellbeing) / 10);
        }
    });

    Helper.WorldStats(world);
    Helper.CreatureStats(creatureForStats);
    if (isFirstTime) {
        aThingDiesInterval = setInterval(() => {
            var rand = Helper.RandomIntFromInterval(0, world.Things.length - 1);
            var index = world.Things.indexOf(world.Things[rand]);
            if (!(world.Things[index] instanceof Creature)) {
                world.Things.splice(index, 1);
            }
        }, 20000);
        isFirstTime = false;
    }
}

function keyTyped() {
    if (p.key === 'r') {
        Helper.AddThing(world, 0, 0, 255, 0, 0);
    } else if (p.key === 'g') {
        Helper.AddThing(world, p.windowWidth, 0, 0, 255, 0);
    } else if (p.key === 'b') {
        Helper.AddThing(world, 0, p.windowHeight, 0, 0, 255);
    }
}