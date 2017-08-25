class Creature extends Thing {
    constructor(x: number, y: number, width: number, height: number,
        stroke: number[], strokeWeight: number, fill: number[], noOfSmells: number) {
        super(x, y, width, height, stroke, strokeWeight, fill);
        for (var i = 0; i < noOfSmells; i++) {
            this.associations.push(Helper.RandomIntFromInterval(0, 5));
        }
        this.NormaliseAssociations;
    }
    associations: number[] = [];
    wellbeing: number = 0;
    whatICanSmell: number[];
    smellUp: number[];
    smellDown: number[];
    smellLeft: number[];
    smellRight: number[];
    sniff(world: World) {
        this.whatICanSmell = world.getSmellAtPosition(this.x, this.y);
        this.smellUp = world.getSmellAtPosition(this.x, this.y + 1);
        this.smellDown = world.getSmellAtPosition(this.x, this.y - 1);
        this.smellLeft = world.getSmellAtPosition(this.x - 1, this.y);
        this.smellRight = world.getSmellAtPosition(this.x + 1, this.y);
    }

    DoAssociating(world: World) {
        this.whatICanSmell = world.getSmellAtPosition(this.x, this.y);
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
            var weightFactor = 1000;
            for (var i = 0; i < noOfSmells; i++) {
                this.associations[i] += averageSmell[i] * changeInWellbeing / weightFactor;
            }
            this.NormaliseAssociations();
        }, Helper.RandomIntFromInterval(50, 2000));
    }

    NormaliseAssociations() {
        var noOfAssociations = this.associations.length;
        var totalAssociations = this.associations.reduce((total, num) => {
            return total + num;
        });
        var weightFactor = 10;
        this.associations.forEach(association => {
            association = weightFactor * association / totalAssociations;
        });
    }

    GetDesireBySmell(smell: number[]): number {
        var desireArray = [];
        for (var i = 0; i < smell.length; i++) {
            desireArray.push(smell[i] * this.associations[i]);
        }
        return desireArray.reduce((total, num) => {
            return total + num;
        });
    }

    DecideWhereToMove() {
        var upDesire = this.GetDesireBySmell(this.smellUp);
        var downDesire = this.GetDesireBySmell(this.smellDown);
        var leftDesire = this.GetDesireBySmell(this.smellLeft);
        var rightDesire = this.GetDesireBySmell(this.smellRight);
        var xDesire = rightDesire - leftDesire;
        var yDesire = upDesire - downDesire;
        if (xDesire > 0) {
            this.x++;
        } else if (xDesire < 0) {
            this.x--;
        }
        if (yDesire > 0) {
            this.y++;
        } else if (yDesire < 0) {
            this.y--;
        }
    }
}