class Creature extends Thing {
    associations: number[];
    wellbeing: number = 0;
    whatICanSmell: number[];
    sniff(world: World){
        this.whatICanSmell = world.getSmellAtPosition(this.x, this.y);
    }
}