function setup() {
    p.createCanvas(p.windowWidth, p.windowHeight);
}

function windowResized() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
}

var world = new World();
world.noOfSmellTypes = 5;

Helper.MakeNoOfCreatures(5, world);
Helper.MakeNoOfFoodItems(Helper.RandomIntFromInterval(1, world.noOfCreatures * world.maxFoodItemsPerCreature), world);

var creatureForStats: Creature;
creatureForStats = Helper.GetAllCreatures(world)[0];

var isFirstTime = true;

var switchVicinitiesInterval;

var thingPathLength = 20;

function draw() {
    world.draw();
    Helper.MoveThingsOnRandomPaths(world, thingPathLength);
    var scoreHeight = 0;
    world.Things.forEach(t => {
        if (t instanceof Creature) {
            var creature = t;
            creature.LiveTheNextMoment(world);
            if (Math.floor(creature.wellbeing) >= Math.floor(creature.idealWellbeing)) {
                creature.score++;
            }
            Helper.WriteOutCreatureScore(creature, p.windowWidth - 200, scoreHeight * 10 + 10);
            scoreHeight = scoreHeight + 2;
            if (creature.wellbeing < 0) {
                var index = world.Things.indexOf(creature);
                world.Things.splice(index, 1);
                if (Helper.GetAllCreatures(world).length <= 2) {
                    for (var i = 0; i < Helper.RandomIntFromInterval(1, world.noOfCreatures - 2); i++) {
                        Helper.MakeARandomCreature();
                    }
                }
            }
        } else {
            if (t.age >= t.maxAge) {
                world.RemoveAndReplaceThing(t);
            }
        }
        t.age += 1 / 1000;
    });

    Helper.WorldStats(world);
    Helper.CreatureStats(creatureForStats);
    if (isFirstTime) {
        switchVicinitiesInterval = setInterval(() => {
            var rand = Helper.RandomIntFromInterval(1, 60);
            if (rand == 1) {
                Helper.GenerateNewVicinities(world);
            }
        }, 1000);
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

function mouseClicked() {
    for (var i = 0; i < world.Things.length; i++) {
        var thing = world.Things[i];
        if (thing instanceof Creature) {
            if (p.mouseX > thing.x - thing.width / 2 && p.mouseX < thing.x + thing.width / 2 &&
                p.mouseY > thing.y - thing.height / 2 && p.mouseY < thing.y + thing.height / 2) {
                creatureForStats = thing;
            }
        }

    }
    p.mouseX
}