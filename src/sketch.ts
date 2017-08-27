function setup() {
    p.createCanvas(p.windowWidth, p.windowHeight);
}

function windowResized() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
}

var world = new World();
var creature = new Creature(world, p.windowWidth / 2, p.windowHeight / 2, 25, 25, [25, 37, 210], 1, [211, 185, 88], 3);

world.Things = Helper.MakeNoOfFoodItems(10, world);

var isFirstTime = true;

var changeAThingInterval;

function draw() {
    world.draw();
    var thingPathLength = 500;
    Helper.MoveThingsOnRandomPaths(world.Things, thingPathLength);
    world.eatThingsInEdibleReach(creature);
    creature.sniff(world);
    creature.DecideWhereToMove();
    creature.NormaliseAssociations();
    creature.draw();

    creature.wellbeing = creature.wellbeing - 0.01;

    Helper.WorldStats(world);
    Helper.CreatureStats(creature);
    if (isFirstTime) {
        changeAThingInterval = setInterval(() => {
            var rand = Helper.RandomIntFromInterval(0, world.Things.length - 1);
            var index = world.Things.indexOf(world.Things[rand]);
            world.Things.splice(index, 1, Helper.MakeRandomFoodItem(world));
        }, 60000);
        isFirstTime = false;
    }
}

function keyTyped() {
    if (p.key === 'r') {
        Helper.AddThing(world.Things, 0, 0, 255, 0, 0);
    } else if (p.key === 'g') {
        Helper.AddThing(world.Things, p.windowWidth, 0, 0, 255, 0);
    } else if (p.key === 'b') {
        Helper.AddThing(world.Things, 0, p.windowHeight, 0, 0, 255);
    }
}