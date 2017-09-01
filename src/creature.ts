class Creature extends Thing {
    constructor(world: World, x: number, y: number, width: number, height: number, fill: number[], smell: number[], longTermImportanceFactor: number,
        minMemoryTime: number, memoryTimeSpread: number) {
        super(world, x, y, width, height, fill, 1, fill, smell);
        this.smellEnergyBrainSection.longTermImportanceFactor = longTermImportanceFactor;
        this.smellEnergyBrainSection.minMemoryTime = minMemoryTime;
        this.smellEnergyBrainSection.memoryTimeSpread = memoryTimeSpread;
        for (var i = 0; i < world.noOfSmellTypes; i++) {
            this.smellEnergyBrainSection.associations.push(1);
            this.desireForSmell.push(1);
        }
        this.associationInterval = setInterval(() => {
            this.smellEnergyBrainSection.DoAssociating(world)
        }, 10);
        this.smellEnergyBrainSection.NormaliseAssociations();
        this.wellbeing = 200;
        this.smellEnergyBrainSection.sensoryFunction = () => {
            return world.GetSmellAtPosition(this.x, this.y, this);
        };
        this.smellEnergyBrainSection.valueGetterFunction = () => {
            return this.wellbeing;
        }
    }
    maxSize = 100;
    associationInterval;
    idealWellbeing: number = 200;
    smellEnergyBrainSection = new SmellEnergy();
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

    DecideWhereToMove() {
        var upDesireArray = this.smellEnergyBrainSection.GetDesireArray(this.idealWellbeing, this.smellUp);
        var downDesireArray = this.smellEnergyBrainSection.GetDesireArray(this.idealWellbeing, this.smellDown);
        var leftDesireArray = this.smellEnergyBrainSection.GetDesireArray(this.idealWellbeing, this.smellLeft);
        var rightDesireArray = this.smellEnergyBrainSection.GetDesireArray(this.idealWellbeing, this.smellRight);
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