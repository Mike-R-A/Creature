class Thing extends Drawable {
    constructor(world: World, x: number, y: number, width: number, height: number,
        stroke: number[], strokeWeight: number, fill: number[], smell: number[]) {
        super(x, y, width, height, stroke, strokeWeight, fill);
        for (var i = 0; i < world.NoOfSmellTypes; i++) {
            this._smell.push(0);
        }
        this.smell = smell;
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
        if (this.width > 1) {
            this.width--;
        }
        if (this.height > 1) {
            this.height--;
        }
        if (this.width <= 1 && this.height <= 1) {
            world.RemoveAndReplaceThing(this);
        }
        return this.nutritionalValuePerBite;
    }
}