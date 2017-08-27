class World {
    constructor() {
        for (var i = 0; i < this.NoOfSmellTypes; i++) {
            this.goodness.push(Helper.RandomIntFromInterval(-5, 5) / 10)
        }
        if (this.goodness[0] < 0 && this.goodness[1] < 0 && this.goodness[2] < 0) {
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
    getSmellAtPosition(x: number, y: number): number[] {
        var smellAtPosition: number[] = [];
        for (var i = 0; i < this.NoOfSmellTypes; i++) {
            smellAtPosition.push(0);
            this.Things.forEach(thing => {
                var distanceSquared = Math.pow(thing.x - x, 2) + Math.pow(thing.y - y, 2);
                if (distanceSquared < 1) {
                    distanceSquared = 1;
                }
                smellAtPosition[i] += thing.smell[i] / distanceSquared
            });
        }
        return smellAtPosition;
    }

    getThingsInEdibleReach(creature: Creature): Thing[] {
        var thingsInEdibleReach = this.Things.filter(thing => {
            return Math.abs(thing.x - creature.x) < (thing.width + creature.width) / 2 && Math.abs(thing.y - creature.y) < (thing.height + creature.height) / 2
        });
        return thingsInEdibleReach;
    }

    eat(creature: Creature, thing: Thing) {
        if (thing.width > 1) {
            thing.width--;
        }
        if (thing.height > 1) {
            thing.height--;
        }
        thing.setSmell();
        if (thing.width <= 1 && thing.height <= 1) {
            this.RemoveAndReplaceThing(thing);
        }
        creature.wellbeing = creature.wellbeing + thing.nutritionalValuePerBite;
    }

    RemoveAndReplaceThing(thing: Thing) {
        var index = this.Things.indexOf(thing);
        var replacementThing = Helper.MakeRandomFoodItem(world);
        this.Things.splice(index, 1, replacementThing);
        this.Things.push();
    }

    eatThingsInEdibleReach(creature: Creature) {
        var thingsInEdibleReach = this.getThingsInEdibleReach(creature);
        thingsInEdibleReach.forEach(thing => {
            this.eat(creature, thing);
        });
    }
}