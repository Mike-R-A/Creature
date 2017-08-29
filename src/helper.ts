module Helper {
    export function MakeNoOfFoodItems(no: number, world: World): Thing[] {
        var things = [];
        for (var i = 0; i < no; i++) {
            var thing = MakeRandomFoodItem(world);
            things.push(thing);
        }
        return things;
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
        var rand = RandomIntFromInterval(-1, 20);
        if (rand > 0) {
            var colourChoice = Helper.RandomIntFromInterval(0, 2);
            switch (colourChoice) {
                case 0:
                    fillG = 0;
                    fillB = 0;
                    break;
                case 1:
                    fillB = 0;
                    fillR = 0;
                    break;
                case 2:
                    fillR = 0;
                    fillG = 0;
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
        return thing;
    }
    export function AddThing(world: World, x: number, y: number, r: number, g: number, b: number) {
        var thing = Helper.MakeRandomFoodItem(world);
        var diameter = RandomIntFromInterval(10, 100);
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
        var minMemoryTime = Helper.RandomIntFromInterval(20, 20000);
        var maxMemoryTime = Helper.RandomIntFromInterval(20, 20000);
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
        var creature = new Creature(world, x, y, 25, 25, [244, 229, 66], [0, 0, 0, smell1, smell2], longTermImportanceFactor, minMemoryTime, maxMemoryTime);
        creature.nutritionalValuePerBite = 0;
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
        GraphAssociations(creature.associations);
        GraphDesireForSmell(creature.desireForSmell);
        GraphSmell(creature.whatICanSmell);
        GraphWellbeing(creature.wellbeing);
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