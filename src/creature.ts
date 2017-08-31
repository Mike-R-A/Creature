class Creature extends Thing {
    constructor(world: World, x: number, y: number, width: number, height: number, fill: number[], smell: number[], longTermImportanceFactor: number,
        minMemoryTime: number, memoryTimeSpread: number) {
        super(world, x, y, width, height, fill, 1, fill, smell);
        this.longTermImportanceFactor = longTermImportanceFactor;
        this.minMemoryTime = minMemoryTime;
        this.memoryTimeSpread = memoryTimeSpread;
        for (var i = 0; i < world.noOfSmellTypes; i++) {
            this.associations.push(1);
            this.desireForSmell.push(1);
        }
        this.associationInterval = setInterval(() => {
            this.DoAssociating(world)
        }, 10);
        this.NormaliseAssociations;
        this.wellbeing = 200;
    }
    maxSize = 100;
    associationInterval;
    associations: number[] = [];
    longTermImportanceFactor: number = 20000;
    minMemoryTime: number = 50;
    memoryTimeSpread: number = 50;
    idealWellbeing: number = 200;
    whatICanSmell: number[] = [];
    smellUp: number[] = [];
    smellDown: number[] = [];
    smellLeft: number[] = [];
    smellRight: number[] = [];
    desireForSmell: number[] = [];
    score: number = 0;
    isFertile = true;
    sniff(world: World) {
        this.whatICanSmell = world.GetSmellAtPosition(this.x, this.y, this);
        this.smellUp = world.GetSmellAtPosition(this.x, this.y + 1, this);
        this.smellDown = world.GetSmellAtPosition(this.x, this.y - 1, this);
        this.smellLeft = world.GetSmellAtPosition(this.x - 1, this.y, this);
        this.smellRight = world.GetSmellAtPosition(this.x + 1, this.y, this);
    }

    DoAssociating(world: World) {
        this.whatICanSmell = world.GetSmellAtPosition(this.x, this.y, this);
        var whatICouldSmellPreviously = this.whatICanSmell;
        var wellBeingPreviously = this.wellbeing;
        var noOfSmells = this.whatICanSmell.length;
        setTimeout(() => {
            this.sniff(world);
            var averageSmell: number[] = new Array(noOfSmells);
            for (var i = 0; i < noOfSmells; i++) {
                averageSmell[i] = (this.whatICanSmell[i] + whatICouldSmellPreviously[i]) / 2;
            }
            var changeInWellbeing = this.wellbeing - wellBeingPreviously;
            for (var i = 0; i < noOfSmells; i++) {
                this.associations[i] += averageSmell[i] * changeInWellbeing / this.longTermImportanceFactor;
            }
            this.NormaliseAssociations();
            //}, Helper.RandomIntFromInterval(50, 3000));
        }, Helper.RandomIntFromInterval(this.minMemoryTime, this.minMemoryTime + this.memoryTimeSpread));
    }

    NormaliseAssociations() {
        var noOfAssociations = this.associations.length;
        var totalAssociations = this.associations.reduce((total, num) => {
            return Math.abs(total) + Math.abs(num);
        });
        if (totalAssociations == 0) {
            totalAssociations = 1;
        }
        var weightFactor = 100;
        for (var i = 0; i < noOfAssociations; i++) {
            this.associations[i] = weightFactor * this.associations[i] / totalAssociations;
        }
    }

    GetDesireArray(smell: number[]): number[] {
        var desireArray = [];
        var wellbeingDeficit = this.wellbeing < this.idealWellbeing ? this.idealWellbeing - this.wellbeing : 0;
        for (var i = 0; i < smell.length; i++) {
            var averageAssociation = 0;
            this.associations.forEach(association => {
                averageAssociation += association;
            });
            var averageAssociation = averageAssociation / this.associations.length
            var tempAssociations: number[] = this.associations.map(a => {
                return a - averageAssociation;
            });
            var desire: number;
            var plainDesire = smell[i] * this.associations[i] * (1 + Math.pow(wellbeingDeficit, 2));
            var desireWithBoost = smell[i] * tempAssociations[i] * (1 + Math.pow(wellbeingDeficit, 2));
            if (this.idealWellbeing > this.wellbeing && plainDesire < 0) {
                desire = desireWithBoost;
            } else {
                desire = plainDesire;
            }
            desire = desire + desire * Math.abs(wellbeingDeficit);
            desireArray.push(desire);
        }
        return desireArray;
    }

    DecideWhereToMove() {
        var upDesireArray = this.GetDesireArray(this.smellUp);
        var downDesireArray = this.GetDesireArray(this.smellDown);
        var leftDesireArray = this.GetDesireArray(this.smellLeft);
        var rightDesireArray = this.GetDesireArray(this.smellRight);
        this.desireForSmell = [];
        for (var i = 0; i < world.noOfSmellTypes; i++) {
            this.desireForSmell.push(upDesireArray[i] + downDesireArray[i] + leftDesireArray[i] + rightDesireArray[i]);
        }

        var xDesire = Helper.GetTotalOfArray(rightDesireArray) - Helper.GetTotalOfArray(leftDesireArray);
        var yDesire = Helper.GetTotalOfArray(upDesireArray) - Helper.GetTotalOfArray(downDesireArray);
        var vectorMagnitude = Math.sqrt(Math.pow(xDesire, 2) + Math.pow(yDesire, 2));
        if (vectorMagnitude == 0) {
            vectorMagnitude = 1;
        };
        this.x += xDesire / vectorMagnitude;
        this.y += yDesire / vectorMagnitude;
    }

    Eat(thing: Thing, world: World) {
        var changeInWellbeing = thing.getEaten(world);
        this.wellbeing += changeInWellbeing;
    }

    InteractWithThingsInReach(world: World) {
        var thingsInReach = world.GetThingsInReach(this);
        thingsInReach.forEach(thing => {
            if (thing instanceof Creature) {
                var rand = Helper.RandomIntFromInterval(1, 500);
                if (rand == 1 && this.isFertile && thing.isFertile) {
                    debugger;
                    Helper.CreatureReproduction(world, this, thing);
                }
            }
            this.Eat(thing, world);
        });
    }

    LiveTheNextMoment(world: World) {
        this.wellbeing = this.wellbeing - 0.005;
        this.sniff(world);
        this.InteractWithThingsInReach(world);
        this.DecideWhereToMove();
        super.draw();
    }
}