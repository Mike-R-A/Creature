class World {
    constructor() {
        for (var i = 0; i < this.NoOfSmellTypes; i++) {
            if (i < 3) {
                this.goodness.push(Helper.RandomIntFromInterval(-2, 2))
            } else {
                this.goodness.push(0);
            }
        }
        if ((this.goodness[0] <= 0 && this.goodness[1] <= 0 && this.goodness[2] <= 0) ||
            (this.goodness[0] >= 0 && this.goodness[1] >= 0 && this.goodness[2] >= 0)) {
            var choice = Helper.RandomIntFromInterval(0, 2);
            this.goodness[choice] = this.goodness[choice] * -1;
        }
    }
    Things: Thing[];
    NoOfSmellTypes = 3;
    goodness: number[] = [];
    draw() {
        p.background([176, 224, 255]);
    }
    GetSmellAtPosition(x, y, creature: Creature): number[] {
        var smellAtPosition: number[] = [];
        for (var i = 0; i < this.NoOfSmellTypes; i++) {
            smellAtPosition.push(0);
            var index = this.Things.indexOf(creature);
            var otherThings = this.Things.slice();
            otherThings.splice(index, 1);
            otherThings.forEach(thing => {
                var distanceSquared = Math.pow(thing.x - x, 2) + Math.pow(thing.y - y, 2);
                if (distanceSquared < 1) {
                    distanceSquared = 1;
                }
                smellAtPosition[i] += thing.smell[i] / distanceSquared
            });
        }
        return smellAtPosition;
    }

    GetThingsInReach(creature: Creature): Thing[] {
        var thingsInReach = this.Things.filter(thing => {
            return Math.abs(thing.x - creature.x) < (thing.width + creature.width) / 2 && Math.abs(thing.y - creature.y) < (thing.height + creature.height) / 2
        });
        return thingsInReach;
    }

    RemoveAndReplaceThing(thing: Thing) {
        if (!(thing instanceof Creature)) {
            var index = this.Things.indexOf(thing);
            var replacementThing = Helper.MakeRandomFoodItem(world);
            this.Things.splice(index, 1, replacementThing);
            this.Things.push();
        }

    }
}