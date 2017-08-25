class Creature extends Thing {
    constructor(x: number, y: number, width: number, height: number,
        stroke: number[], strokeWeight: number, fill: number[], noOfSmells: number) {
        super(x, y, width, height, stroke, strokeWeight, fill);
        for (var i = 0; i < noOfSmells; i++) {
            this.associations.push(1);
        }
        this.NormaliseAssociations;
    }
    associations: number[] = [];
    wellbeing: number = 0;
    whatICanSmell: number[];
    sniff(world: World) {
        this.whatICanSmell = world.getSmellAtPosition(this.x, this.y);
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
        }, 50);
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
}