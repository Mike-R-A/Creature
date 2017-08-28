class Drawable {
    constructor(x: number, y: number, width: number, height: number,
        stroke: number[], strokeWeight: number, fill: number[]) {
        this.x = x;
        this.y = y;
        this.stroke = stroke;
        this.strokeWeight = strokeWeight;
        this.fill = fill;
        this.width = width;
        this.height = height;
    };
    x: number;
    y: number;
    lastX: number;
    lastY: number;
    stroke: number[];
    strokeWeight: number;
    fill: number[];
    width: number;
    height: number;
    draw() {
        if (this.x < Math.abs(this.width / 2)) {
            this.x = Math.abs(this.width / 2);
        }
        if (this.x > p.windowWidth - Math.abs(this.width / 2)) {
            this.x = p.windowWidth - Math.abs(this.width / 2);
        }
        if (this.y < Math.abs(this.height / 2)) {
            this.y = Math.abs(this.height / 2);
        }
        if (this.y > p.windowHeight - Math.abs(this.height / 2)) {
            this.y = p.windowHeight - Math.abs(this.height / 2);
        }
        p.stroke(this.stroke);
        p.strokeWeight(this.strokeWeight);
        p.fill(this.fill);
        p.ellipse(this.x, this.y, this.width, this.height);
    }
    move(x: number, y: number) {
        if (!(this instanceof Creature)) {
            this.lastX = this.x;
            this.lastY = this.y;
            if (x > 0) {
                this.x++;
            }
            else if (x < 0) {
                this.x--
            };
            if (y > 0) {
                this.y++;
            }
            else if (y < 0) {
                this.y--
            }
        }

    }
}