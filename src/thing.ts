class Thing extends Drawable {
    constructor(world: World, x: number, y: number, width: number, height: number,
        stroke: number[], strokeWeight: number, fill: number[], smell: number[]) {
        super(x, y, width, height, stroke, strokeWeight, fill);
        for (var i = 0; i < world.NoOfSmellTypes; i++) {
            this._smell.push(0);
        }
        this.smell = smell;
        if (this instanceof Creature) {
            console.log("creature thing constructor");
        }
    }
    _wellbeing: number = this.width;
    get wellbeing() {
        return this._wellbeing;
    }
    set wellbeing(value) {
        this._wellbeing = value;
        if (!(this instanceof Creature)) {
            this.width = value;
            this.height = value;
        }
    }
    _smell: number[] = [];
    get smell(): number[] {
        return this._smell.map(s => s * this.width);
    }
    set smell(theSmell: number[]) {
        for (var i = 0; i < theSmell.length; i++) {
            this._smell[i] = theSmell[i];
        }
    }
    nutritionalValuePerBite: number;

    getEaten(world: World): number {
        this.wellbeing--;
        if (this.wellbeing <= 1 && !(this instanceof Creature)) {
            world.RemoveAndReplaceThing(this);
        }
        return this.nutritionalValuePerBite;
    }
}