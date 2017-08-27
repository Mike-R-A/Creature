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
        var x = RandomIntFromInterval(0, p.windowWidth);
        var y = RandomIntFromInterval(0, p.windowHeight);
        var diameter = RandomIntFromInterval(10, 100);
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
        var thing = new Thing(x, y, diameter, diameter, [strokeR, strokeG, strokeB],
            strokeWeight, [fillR, fillG, fillB]);
        thing.nutritionalValuePerBite = (fillR * world.goodness[0] + fillG * world.goodness[1] + fillB * world.goodness[2]) / (fillR + fillG + fillB);
        thing.setSmell();
        return thing;
    }
    export function AddThing(things: Thing[], x: number, y: number, r: number, g: number, b: number) {
        var diameter = RandomIntFromInterval(10, 100);
        var strokeR = r;
        var strokeG = g;
        var strokeB = b;
        var fillR = r;
        var fillG = g;
        var fillB = b;
        var thing = new Thing(x, y, diameter, diameter, [strokeR, strokeG, strokeB],
            1, [fillR, fillG, fillB]);
        thing.nutritionalValuePerBite = (fillR * world.goodness[0] + fillG * world.goodness[1] + fillB * world.goodness[2]) / (fillR + fillG + fillB);
        thing.setSmell();
        things.push(thing);
    }
    export function MoveThingsOnRandomPaths(things: Thing[], pathLength: number) {
        things.forEach(t => {
            var xChange = t.x - t.lastX;
            var yChange = t.y - t.lastY;
            t.move(Helper.RandomIntFromInterval(-1, pathLength) * xChange + Helper.RandomIntFromInterval(-1, 1),
                Helper.RandomIntFromInterval(-1, pathLength) * yChange + Helper.RandomIntFromInterval(-1, 1));
            t.draw();
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
            for (var i = 0; i < arrayToGraph.length; i++) {
                p.fill(barColours[i]);
                var barHeight = arrayToGraph[i] * weightFactor / (total + 1);
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
            210,
            100,
            "Association with Nutritional Value"
        );
    }
    export function GraphDesireForSmell(desireForSmell: number[]) {
        Graph(desireForSmell,
            [[255, 0, 0], [0, 255, 0], [0, 0, 255]],
            100,
            20,
            410,
            100,
            "Current Desire"
        );
    }
    export function GraphSmell(smell: number[]) {
        Graph(smell,
            [[255, 0, 0], [0, 255, 0], [0, 0, 255]],
            100,
            20,
            610,
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
}