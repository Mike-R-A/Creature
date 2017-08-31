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
    age: number = 0;
    maxAge: number = 5;
    nutritionalValuePerBite: number;
    getEaten(world: World): number {
        this.wellbeing--;
        if (this.wellbeing <= 1 && !(this instanceof Creature)) {
            world.RemoveAndReplaceThing(this);
        }
        return this.nutritionalValuePerBite;
    }

    move(world: World, pathLength: number) {
        if (!(this instanceof Creature)) {
            var randForWhetherToChangeDirection = Helper.RandomIntFromInterval(-1, pathLength);
            if (randForWhetherToChangeDirection < 0) {
                this.lastX = this.x;
                this.lastY = this.y;
                var minDistThing = this.FindTheNearestThing(world);
                var otherThing = minDistThing.thing;
                var distanceToOtherThing = minDistThing.distance;
                if (distanceToOtherThing == 0) {
                    distanceToOtherThing = 1;
                }

                var xToOther = (otherThing.x - this.x) / distanceToOtherThing;
                var yToOther = (otherThing.y - this.y) / distanceToOtherThing;

                if (otherThing.lastX != null && otherThing.lastY != null) {
                    var xChangeOfOther = otherThing.x - otherThing.lastX;
                    var yChangeOfOther = otherThing.y - otherThing.lastY;
                    xToOther = (xToOther + xChangeOfOther * 5) / 6;
                    yToOther = (yToOther + yChangeOfOther * 5) / 6;
                }

                if (otherThing instanceof Creature || distanceToOtherThing <= (this.width + otherThing.width) / 2) {
                    this.x = this.x - xToOther * 0.5;
                    this.y = this.y - yToOther * 0.5;
                } else {
                    this.x = this.x + xToOther;
                    this.y = this.y + yToOther;
                }
            } else {

                if (this.lastX == null) {
                    this.lastX = this.x
                }
                if (this.lastY == null) {
                    this.lastY = this.y
                }

                var xChange = this.x - this.lastX;
                var yChange = this.y - this.lastY;
                this.lastX = this.x;
                this.lastY = this.y;
                var asIsDistance = Math.sqrt(Math.pow(xChange, 2) + Math.pow(yChange, 2));
                if (asIsDistance == 0) {
                    asIsDistance = 1;
                }
                this.x += xChange / asIsDistance;
                this.y += yChange / asIsDistance;
            }
            this.x += Helper.RandomIntFromInterval(-1, 1) / 10;
            this.y += Helper.RandomIntFromInterval(-1, 1) / 10;
        }

    }

    FindTheNearestThing(world: World): { thing: Thing, distance: number } {
        var minDistThing: Thing;
        var minDist: number;
        var otherThings = world.GetOtherThings(this);
        otherThings.forEach(thing => {
            var dist = Helper.GetDistance(this, thing);
            if (minDistThing == null || dist < minDist) {
                minDistThing = thing;
                minDist = dist;
            }
        });
        return { thing: minDistThing, distance: minDist };
    }
}