class Thing extends Drawable {
    smell: number[];
    nutritionalValuePerBite: number;
    setSmell() {
        this.smell = [10 * this.fill[0] * this.width, 10 * this.fill[1] * this.width,
        10 * this.fill[2] * this.width];
    }
    getEaten(world: World): number {
        if (this.width > 1) {
            this.width--;
        }
        if (this.height > 1) {
            this.height--;
        }
        this.setSmell();
        if (this.width <= 1 && this.height <= 1) {
            world.RemoveAndReplaceThing(this);
        }
        return this.nutritionalValuePerBite;
    }
}