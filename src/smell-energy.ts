class SmellEnergy extends BrainSection {
    GetDesireArray(idealValue: number, smellArray: number[]): number[] {
        var desireArray = [];
        var wellbeingDeficit = this.valueGetterFunction() < idealValue ? idealValue - this.valueGetterFunction() : 0;
        for (var i = 0; i < this.noOfAssociations; i++) {
            var averageAssociation = 0;
            this.associations.forEach(association => {
                averageAssociation += association;
            });
            var averageAssociation = averageAssociation / this.associations.length
            var tempAssociations: number[] = this.associations.map(a => {
                return a - averageAssociation;
            });
            var desire: number;
            var plainDesire = smellArray[i] * this.associations[i] * (1 + Math.pow(wellbeingDeficit, 2));
            var desireWithBoost = smellArray[i] * tempAssociations[i] * (1 + Math.pow(wellbeingDeficit, 2));
            if (idealValue > this.valueGetterFunction() && plainDesire < 0) {
                desire = desireWithBoost;
            } else {
                desire = plainDesire;
            }
            desire = desire + desire * Math.abs(wellbeingDeficit);
            desireArray.push(desire);
        }
        return desireArray;
    }
}