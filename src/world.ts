class World {
    Things: Thing[];
    NoOfSmellTypes = 3;
    draw(){
        p.background([176,224,255]);
    }
    getSmellAtPosition(x: number,y: number):number[]{
        var smellAtPosition: number[] = [];
        for(var i=0;i<this.NoOfSmellTypes;i++){
            smellAtPosition.push(0);
            this.Things.forEach(thing => {
                var distanceSquared = Math.pow(thing.x - x, 2) + Math.pow(thing.y - y,2);
                if(distanceSquared<1){
                    distanceSquared = 1;
                }
                smellAtPosition[i] += thing.smell[i] / distanceSquared             
            });
        }
        return smellAtPosition;
    }

    getThingsInEdibleReach(creature: Creature): Thing[]{
        var thingsInEdibleReach = this.Things.filter(thing => {
            return Math.abs(thing.x - creature.x) < (thing.width + creature.width)/2 && Math.abs(thing.y - creature.y) < (thing.height + creature.height)/2
        });
        return thingsInEdibleReach;
    }

    eat(creature: Creature, thing: Thing){
        if(thing.width > 1){
            thing.width--;
        } 
        if(thing.height > 1){
            thing.height--;
        }
        if(thing.width <= 1 && thing.height <=1) {
            var index = this.Things.indexOf(thing);
            var replacementThing = Helper.MakeRandomFoodItem();
            this.Things.splice(index, 1, replacementThing);
            this.Things.push();
        }
        creature.wellbeing++;
    }

    eatThingsInEdibleReach(creature: Creature){
        var thingsInEdibleReach = this.getThingsInEdibleReach(creature);
        thingsInEdibleReach.forEach(thing => {
            this.eat(creature, thing);
        });
    }
}