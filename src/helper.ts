module Helper {
    export function MakeNoOfFoodItems(no: number, world: World): Thing[] {
        var things = [];
        for (var i = 0; i < no; i++) {
            var thing = MakeRandomFoodItem(world);
            things.push(thing);
        }
        return things;
    }

    export function MakeNoOfCreatures(noOfCreatures: number, world: World): Creature[] {
        var creatures: Creature[] = [];
        for (var i = 0; i < noOfCreatures; i++) {
            var creature = Helper.MakeARandomCreature();
            creature.label = i.toString();
            creatures.push(creature);
        }
        world.noOfCreatures = noOfCreatures;
        return creatures;
    }

    export function MakeRandomFoodItem(world: World): Thing {
        var randomSide = Helper.RandomIntFromInterval(1, 4);
        var x: number;
        var y: number;
        switch (randomSide) {
            case 1:
                x = 0;
                y = Helper.RandomIntFromInterval(0, p.windowHeight);
                break;
            case 2:
                x = Helper.RandomIntFromInterval(0, p.windowWidth);
                y = 0;
                break;
            case 3:
                x = Helper.RandomIntFromInterval(0, p.windowWidth);
                y = p.windowHeight;
                break;
            case 4:
                x = p.windowWidth;
                y = Helper.RandomIntFromInterval(0, p.windowHeight);
                break;
        }

        var diameter = RandomIntFromInterval(10, 50);
        var strokeR = RandomIntFromInterval(0, 255);
        var strokeG = RandomIntFromInterval(0, 255);
        var strokeB = RandomIntFromInterval(0, 255);
        var fillR = RandomIntFromInterval(0, 255);
        var fillG = RandomIntFromInterval(0, 255);
        var fillB = RandomIntFromInterval(0, 255);
        var rand = RandomIntFromInterval(-1, 10);
        if (rand > 0) {
            var colourChoice = Helper.RandomIntFromInterval(0, 2);
            var vicinitySpread = 20;
            switch (colourChoice) {
                case 0:
                    fillG = 0;
                    fillB = 0;
                    x = Helper.RandomIntFromInterval(world.redVicinityX - vicinitySpread, world.redVicinityX + vicinitySpread);
                    y = Helper.RandomIntFromInterval(world.redVicinityY - vicinitySpread, world.redVicinityY + vicinitySpread);
                    break;
                case 1:
                    fillB = 0;
                    fillR = 0;
                    x = Helper.RandomIntFromInterval(world.greenVicinityX - vicinitySpread, world.greenVicinityX + vicinitySpread);
                    y = Helper.RandomIntFromInterval(world.greenVicinityY - vicinitySpread, world.greenVicinityY + vicinitySpread);
                    break;
                case 2:
                    fillR = 0;
                    fillG = 0;
                    x = Helper.RandomIntFromInterval(world.blueVicinityX - vicinitySpread, world.blueVicinityX + vicinitySpread);
                    y = Helper.RandomIntFromInterval(world.blueVicinityY - vicinitySpread, world.blueVicinityY + vicinitySpread);
                    break;
            }
        }
        var strokeWeight = 1;
        var thing = new Thing(world, x, y, diameter, diameter, [strokeR, strokeG, strokeB],
            strokeWeight, [fillR, fillG, fillB], [fillR, fillG, fillB]);
        thing.wellbeing = diameter;
        var totalFill = fillR + fillG + fillB;
        if (totalFill == 0) {
            totalFill = 1;
        }
        thing.nutritionalValuePerBite = (fillR * world.goodness[0] + fillG * world.goodness[1] + fillB * world.goodness[2]) / totalFill;
        world.Things.push(thing);
        return thing;
    }
    export function GenerateNewVicinities(world: World) {
        world.redVicinityX = Helper.RandomIntFromInterval(0, p.windowWidth);
        world.redVicinityY = Helper.RandomIntFromInterval(0, p.windowHeight);
        world.greenVicinityX = Helper.RandomIntFromInterval(0, p.windowWidth);
        world.greenVicinityY = Helper.RandomIntFromInterval(0, p.windowHeight);
        world.blueVicinityX = Helper.RandomIntFromInterval(0, p.windowWidth);
        world.blueVicinityY = Helper.RandomIntFromInterval(0, p.windowHeight);
    }
    export function AddThing(world: World, x: number, y: number, r: number, g: number, b: number) {
        var thing = Helper.MakeRandomFoodItem(world);
        var diameter = RandomIntFromInterval(10, 100);
        thing.maxAge = Helper.RandomIntFromInterval(1, 100) / 2;
        thing.x = x;
        thing.y = y;
        thing.stroke = [r, g, b];
        thing.fill = [r, g, b];
        world.Things.push(thing);
    }
    export function MakeARandomCreature() {
        var x = Helper.RandomIntFromInterval(0, p.windowWidth);
        var y = Helper.RandomIntFromInterval(0, p.windowHeight);
        var r = Helper.RandomIntFromInterval(0, 255);
        var g = Helper.RandomIntFromInterval(0, 255);
        var b = Helper.RandomIntFromInterval(0, 255);
        var longTermImportanceFactor = Helper.RandomIntFromInterval(1, 20000);
        var minMemoryTime = Helper.RandomIntFromInterval(20, 2000);
        var memoryTimeSpread = Helper.RandomIntFromInterval(1, 20000);
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
        var creature = new Creature(world, x, y, 25, 25, [244, 229, 66], [0, 0, 0, smell1, smell2], longTermImportanceFactor, minMemoryTime, memoryTimeSpread);
        creature.nutritionalValuePerBite = 0;
        creature.label = "unnamed";
        world.Things.push(creature);
        return creature;
    }
    export function MoveThingsOnRandomPaths(world: World, pathLength: number) {
        world.Things.forEach(t => {
            if (!(t instanceof Creature)) {
                t.move(world, pathLength);
                t.draw();
            }
        });
    }

    export function RandomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    export function WorldStats(world: World) {
        GraphGoodness(world.goodness);
    }
    export function CreatureStats(creature: Creature) {
        p.stroke([0, 0, 0]);
        p.fill([0, 0, 0]);
        p.text("Stats for creature " + creature.label, 150, 10, 500, 50);
        p.text("longTermImportance: " + creature.smellEnergyBrainSection.longTermImportanceFactor.toString(), 150, 30, 500, 60);
        p.text("minMemoryTime: " + creature.smellEnergyBrainSection.minMemoryTime.toString(), 150, 50, 500, 70);
        p.text("memoryTimeSpread: " + creature.smellEnergyBrainSection.memoryTimeSpread.toString(), 150, 70, 500, 80);
        p.text("score: " + creature.score.toString(), 150, 90, 500, 80);
        GraphAssociations(creature.smellEnergyBrainSection.associations);
        GraphDesireForSmell(creature.desireForSmell);
        GraphSmell(creature.whatICanSmell);
        GraphWellbeing(creature.wellbeing);
    }
    export function WriteOutCreatureScore(creature: Creature, x: number, y: number) {
        p.stroke(0);
        p.fill(0);
        p.text("creature " + creature.label + ":   " + creature.score.toString(), x, y, x + 100, y + 100);
    }
    export function Graph(arrayToGraph: number[], barColours: number[][],
        weightFactor: number, barWidth: number, leftOffset: number, topOffset: number, title: string) {
        if (arrayToGraph) {
            p.stroke(0);
            p.strokeWeight(1);

            var total = arrayToGraph.reduce((total, num) => {
                return Math.abs(total) + Math.abs(num);
            });
            if (total == 0) {
                total = 1;
            }
            for (var i = 0; i < arrayToGraph.length; i++) {
                p.fill(barColours[i] || [0, 0, 0]);
                var barHeight = arrayToGraph[i] * weightFactor / total;
                var x = i * (barWidth + 20) + leftOffset;
                p.rect(x, topOffset - barHeight, barWidth, barHeight);
            }
            p.text(title, leftOffset, topOffset, barWidth, topOffset);
        }
    }
    export function GraphGoodness(goodness: number[]) {
        Graph(goodness,
            [[255, 0, 0], [0, 255, 0], [0, 0, 255]],
            100,
            20,
            10,
            100,
            "Nutritional Value"
        );
    }
    export function GraphAssociations(associations: number[]) {
        Graph(associations,
            [[255, 0, 0], [0, 255, 0], [0, 0, 255]],
            100,
            20,
            310,
            100,
            "Association with Nutritional Value"
        );
    }
    export function CreatureReproduction(world: World, creature1: Creature, creature2: Creature): Creature {
        creature1.isFertile = false;
        creature2.isFertile = false;
        var child = Helper.MakeARandomCreature();
        child.isFertile = false;
        setTimeout(() => {
            creature1.isFertile = true;
            creature2.isFertile = true;
            child.isFertile = true;
        }, 30000);

        child.x = (creature1.x + creature2.x) / 2;
        child.y = (creature1.y + creature2.y) / 2;
        creature1.x += creature1.width * 2;
        creature1.y += creature1.height * 2;
        creature2.x -= creature2.width * 2;
        creature2.y -= creature2.height * 2;
        var rand = Helper.RandomIntFromInterval(1, 2);
        child.width = rand == 1 ? creature1.width : creature2.width;
        rand = Helper.RandomIntFromInterval(1, 2);
        child.height = rand == 1 ? creature1.height : creature2.height;
        rand = Helper.RandomIntFromInterval(1, 2);
        child.fill = rand == 1 ? creature1.fill : creature2.fill;
        rand = Helper.RandomIntFromInterval(1, 2);
        child.smell = rand == 1 ? creature1.smell : creature2.smell;
        rand = Helper.RandomIntFromInterval(1, 2);
        child.smellEnergyBrainSection.longTermImportanceFactor = rand == 1 ? creature1.smellEnergyBrainSection.longTermImportanceFactor : creature2.smellEnergyBrainSection.longTermImportanceFactor;
        rand = Helper.RandomIntFromInterval(1, 2);
        child.smellEnergyBrainSection.minMemoryTime = rand == 1 ? creature1.smellEnergyBrainSection.minMemoryTime : creature2.smellEnergyBrainSection.minMemoryTime;
        rand = Helper.RandomIntFromInterval(1, 2);
        child.smellEnergyBrainSection.memoryTimeSpread = rand == 1 ? creature1.smellEnergyBrainSection.memoryTimeSpread : creature2.smellEnergyBrainSection.memoryTimeSpread;
        for (var i = 0; i < world.noOfSmellTypes; i++) {
            child.smellEnergyBrainSection.associations[i] = (creature1.smellEnergyBrainSection.associations[i] + creature2.smellEnergyBrainSection.associations[i]) / 2;
        }

        // var child = new Creature(world, x, y, width, height, fill, smell, longTermImportanceFactor, minMemoryTime, memoryTimeSpread);
        child.label = creature1.label + creature2.label;
        // world.Things.push(child);
        return child;
    }
    export function GetAllCreatures(world: World): Creature[] {
        return <Creature[]>world.Things.filter(t => t instanceof Creature);
    }
    export function GetBestTwoCreatures(world: World): Creature[] {
        var creatures = <Creature[]>Helper.GetAllCreatures(world);
        creatures.sort((a, b) => {
            return b.score - a.score;
        });
        return [creatures[0], creatures[1]];
    }
    export function BreedTwoBestCreatures(world: World): Creature {
        var creatures = Helper.GetBestTwoCreatures(world);
        return CreatureReproduction(world, creatures[0], creatures[1]);
    }
    export function GraphDesireForSmell(desireForSmell: number[]) {
        Graph(desireForSmell,
            [[255, 0, 0], [0, 255, 0], [0, 0, 255]],
            100,
            20,
            610,
            100,
            "Current Thoughts"
        );
    }
    export function GraphSmell(smell: number[]) {
        Graph(smell,
            [[255, 0, 0], [0, 255, 0], [0, 0, 255]],
            100,
            20,
            910,
            100,
            "Current Smell"
        );
    }
    export function GraphWellbeing(wellbeing: number) {
        p.stroke(0);
        p.strokeWeight(1);
        p.fill([255, 67, 104]);
        var rightOffset = 50;
        var bottomOffset = p.windowHeight / 2;
        var barWidth = 20;
        var barHeight = wellbeing;
        var x = p.windowWidth - rightOffset;
        p.rect(x, p.windowHeight - barHeight - bottomOffset, barWidth, barHeight);
        p.text(Math.floor(wellbeing).toString(), x, p.windowHeight - bottomOffset, barWidth, bottomOffset);
    }

    export function GetTotalOfArray(array: number[]) {
        return array.reduce((total, num) => {
            return total + num;
        });
    }

    export function GetDistance(thing1: Thing, thing2: Thing) {
        return Math.sqrt(Math.pow(thing2.x - thing1.x, 2) + Math.pow(thing2.y - thing1.y, 2));
    }
}