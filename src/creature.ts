class Creature extends Thing {
    associations: number[];
    wellbeing: number;
    whatICanSmell: number[];
    sniff(){
        this.whatICanSmell = world.getSmellAtPosition(this.x, this.y);
    }
}