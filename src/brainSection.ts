abstract class BrainSection {
    associations: number[] = [];
    longTermImportanceFactor: number = 20000;
    minMemoryTime: number = 50;
    memoryTimeSpread: number = 50;
    sensoryFunction: any;
    valueGetterFunction: any;
    get noOfAssociations() {
        return this.associations.length;
    }

    DoAssociating(world: World) {
        var whatICouldSensePreviously = this.sensoryFunction();
        var valueForAssociationPreviously = this.valueGetterFunction();
        setTimeout(() => {
            var whatIcanSenseNow = this.sensoryFunction();
            var averageSense: number[] = new Array(this.noOfAssociations);
            for (var i = 0; i < this.noOfAssociations; i++) {
                averageSense[i] = (whatIcanSenseNow[i] + whatICouldSensePreviously[i]) / 2;
            }
            var changeInValue = this.valueGetterFunction() - valueForAssociationPreviously;
            for (var i = 0; i < this.noOfAssociations; i++) {
                this.associations[i] += averageSense[i] * changeInValue / this.longTermImportanceFactor;
            }
            this.NormaliseAssociations();
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

    abstract GetDesireArray(...params: any[]): number[];
}