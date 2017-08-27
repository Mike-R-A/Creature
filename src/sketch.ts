function setup() {
    p.createCanvas(p.windowWidth, p.windowHeight);
}

function windowResized() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
}

var world = new World();
var creature1 = new Creature(world, p.windowWidth / 2, p.windowHeight / 2, 25, 25, [25, 37, 210], 1, [211, 185, 88], [0, 0, 0, 255]);
// var creature2 = new Creature(world, p.windowWidth / 3, p.windowHeight / 3, 25, 25, [25, 37, 210], 1, [211, 185, 88], [0, 0, 0, 255]);

world.Things = Helper.MakeNoOfFoodItems(10, world);
world.Things.push(creature1);
// world.Things.push(creature2);

var isFirstTime = true;

var aThingDiesInterval;

var thingPathLength = 500;

function draw() {
    world.draw();
    Helper.MoveThingsOnRandomPaths(world.Things, thingPathLength);
    creature1.LiveTheNextMoment(world);
    creature1.wellbeing = creature1.wellbeing - 0.01;
    // creature2.LiveTheNextMoment(world);
    // creature2.wellbeing = creature1.wellbeing - 0.01;

    Helper.WorldStats(world);
    Helper.CreatureStats(creature1);
    if (isFirstTime) {
        aThingDiesInterval = setInterval(() => {
            var rand = Helper.RandomIntFromInterval(0, world.Things.length - 1);
            var index = world.Things.indexOf(world.Things[rand]);
            world.Things.splice(index, 1);
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