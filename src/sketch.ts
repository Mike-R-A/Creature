function setup() {
    p.createCanvas(p.windowWidth, p.windowHeight);
}

function windowResized() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
}

var world = new World();
world.NoOfSmellTypes = 5;
var noOfCreatures = 10;
var creatures: Creature[] = [];
world.Things = Helper.MakeNoOfFoodItems(10, world);

for (var i = 0; i < noOfCreatures; i++) {
    var x = Helper.RandomIntFromInterval(0, p.windowWidth);
    var y = Helper.RandomIntFromInterval(0, p.windowHeight);
    var r = Helper.RandomIntFromInterval(0, 255);
    var g = Helper.RandomIntFromInterval(0, 255);
    var b = Helper.RandomIntFromInterval(0, 255);
    var flip = Helper.RandomIntFromInterval(0, 1);
    var smell1;
    var smell2;
    if (flip == 1) {
        smell1 = 0;
        smell2 = 255;
    } else {
        smell1 = 255;
        smell2 = 0;
    }
    var creature = new Creature(world, x, y, 25, 25, [25, 37, 210], 1, [r, g, b], [0, 0, 0, smell1, smell2]);
    creatures.push(creature);
    world.Things.push(creature);
}

var isFirstTime = true;

var aThingDiesInterval;

var thingPathLength = 500;

function draw() {
    world.draw();
    Helper.MoveThingsOnRandomPaths(world.Things, thingPathLength);
    creatures.forEach(c => {
        c.LiveTheNextMoment(world);
        c.wellbeing = c.wellbeing - 0.01;
    });

    Helper.WorldStats(world);
    Helper.CreatureStats(creatures[0]);
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