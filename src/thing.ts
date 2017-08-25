class Thing extends Drawable {
    smell: number[];
    nutritionalValuePerBite: number;
    setSmell() {
        this.smell = [10 * this.fill[0] * this.width, 10 * this.fill[1] * this.width,
        10 * this.fill[2] * this.width];
    }
}