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
        if (this.x < this.width / 2) {
            this.x = this.width / 2;
        }
        if (this.x > p.windowWidth - this.width / 2) {
            this.x = p.windowWidth - this.width / 2;
        }
        if (this.y < this.height / 2) {
            this.y = this.height / 2;
        }
        if (this.y > p.windowHeight - this.height / 2) {
            this.y = p.windowHeight - this.height / 2;
        }
        p.stroke(this.stroke);
        p.strokeWeight(this.strokeWeight);
        p.fill(this.fill);
        p.ellipse(this.x, this.y, this.width, this.height);
    }
    move(x: number, y: number) {
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