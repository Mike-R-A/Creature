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
    Helper.MoveThingsOnRandomPaths(world.Things, 500);
    creature.sniff(world);
    Helper.WorldStats(world);
    Helper.CreatureStats(creature);
    creature.DecideWhereToMove();
    creature.draw();
    world.eatThingsInEdibleReach(creature);

    creature.wellbeing = creature.wellbeing - 0.05;

    if (isFirstTime) {
        changeAThingInterval = setInterval(() => {
            var rand = Helper.RandomIntFromInterval(0, world.Things.length - 1);
            var index = world.Things.indexOf(world.Things[rand]);
            world.Things.splice(index, 1, Helper.MakeRandomFoodItem(world));
        }, 60000);
        isFirstTime = false;
    }
    creature.NormaliseAssociations();
}