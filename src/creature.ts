class Creature extends Thing {
    constructor(world: World, x: number, y: number, width: number, height: number,
        stroke: number[], strokeWeight: number, fill: number[], smell: number[]) {
        super(world, x, y, width, height, stroke, strokeWeight, fill, smell);
        for (var i = 0; i < world.NoOfSmellTypes; i++) {
            this.associations.push(1);
            this.desireForSmell.push(1);
        }
        this.associationInterval = setInterval(() => {
            this.DoAssociating(world)
        }, 10);
        this.NormaliseAssociations;
    }
    maxSize = 100;
    associationInterval;
    associations: number[] = [];
    wellbeing: number = 0;
    idealWellbeing: number = 100;
    whatICanSmell: number[];
    smellUp: number[];
    smellDown: number[];
    smellLeft: number[];
    smellRight: number[];
    desireForSmell: number[] = [];
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
            var weightFactor = 200000;
            for (var i = 0; i < noOfSmells; i++) {
                this.associations[i] += averageSmell[i] * changeInWellbeing / weightFactor;
            }
            this.NormaliseAssociations();
        }, Helper.RandomIntFromInterval(50, 3000));
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
        var wellbeingDeficit = this.idealWellbeing - this.wellbeing;
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
            var plainDesire = smell[i] * this.associations[i] * Math.sign(wellbeingDeficit) * Math.pow(wellbeingDeficit, 2);
            var desireWithBoost = smell[i] * tempAssociations[i] * Math.sign(wellbeingDeficit) * Math.pow(wellbeingDeficit, 2);
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
        for (var i = 0; i < world.NoOfSmellTypes; i++) {
            this.desireForSmell.push(upDesireArray[i] + downDesireArray[i] + leftDesireArray[i] + rightDesireArray[i]);
        }

        var xDesire = Helper.GetTotalOfArray(rightDesireArray) - Helper.GetTotalOfArray(leftDesireArray);
        var yDesire = Helper.GetTotalOfArray(upDesireArray) - Helper.GetTotalOfArray(downDesireArray);
        var vectorMagnitude = Math.sqrt(Math.pow(xDesire, 2) + Math.pow(yDesire, 2));
        this.x += xDesire / vectorMagnitude;
        this.y += yDesire / vectorMagnitude;
    }

    Eat(thing: Thing, world: World) {
        var changeInWellbeing = thing.getEaten(world);
        this.wellbeing += changeInWellbeing;
        if (this.width < this.maxSize) {
            this.width += changeInWellbeing;
        }
        if (this.height < this.maxSize) {
            this.height += changeInWellbeing;
        }
    }

    EatThingsInReach(world: World) {
        var thingsInReach = world.GetThingsInReach(this);
        thingsInReach.forEach(thing => {
            this.Eat(thing, world);
        });
    }

    LiveTheNextMoment(world: World) {
        this.sniff(world);
        this.EatThingsInReach(world);
        this.DecideWhereToMove();
        super.draw();
    }
}