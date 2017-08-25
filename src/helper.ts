module Helper {
    export function MakeNoOfFoodItems(no: number): Thing[] {
        var things = [];
        for (var i = 0; i < no; i++) {
            var thing = MakeRandomFoodItem();
            things.push(thing);
        }
        return things;
    }

    export function MakeRandomFoodItem(): Thing {
        var x = RandomIntFromInterval(0, p.windowWidth);
        var y = RandomIntFromInterval(0, p.windowHeight);
        var diameter = RandomIntFromInterval(10, 100);
        var strokeR = RandomIntFromInterval(0, 255);
        var strokeG = RandomIntFromInterval(0, 255);
        var strokeB = RandomIntFromInterval(0, 255);
        var fillR = RandomIntFromInterval(0, 255);
        var fillG = RandomIntFromInterval(0, 255);
        var fillB = RandomIntFromInterval(0, 255);
        var strokeWeight = 1;
        var thing = new Thing(x, y, diameter, diameter, [strokeR, strokeG, strokeB],
            strokeWeight, [fillR, fillG, fillB]);
        var redGoodness = 4;
        var greenGoodness = -2;
        var blueGoodness = 1;
        thing.nutritionalValuePerBite = (fillR * redGoodness + fillG * greenGoodness + fillB * blueGoodness) / (fillR + fillG + fillB);
        thing.setSmell();
        return thing;
    }

    export function RandomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    export function GraphSmell(smell: number[]) {
        p.stroke(0);
        p.strokeWeight(1);
        var barColour: number[][] = [];
        barColour[0] = [255, 0, 0];
        barColour[1] = [0, 255, 0];
        barColour[2] = [0, 0, 255];

        var totalSmell = smell.reduce((total, num) => {
            return total + num;
        });
        for (var i = 0; i < smell.length; i++) {
            p.fill(barColour[i]);
            var barHeight = smell[i] * 200 / (totalSmell + 1);
            var barWidth = 20;
            var leftOffset = 50;
            var bottomOffset = 50;
            var x = i * 50 + leftOffset;
            p.rect(x, p.windowHeight - barHeight - bottomOffset, barWidth, barHeight);
            p.text(Math.floor(smell[i]).toString(), x, p.windowHeight - bottomOffset, barWidth, bottomOffset);
        }
        p.text(Math.floor(totalSmell).toString(), 10, p.windowHeight - bottomOffset, leftOffset, bottomOffset);
    }

    export function GraphAssociations(associations: number[]) {
        p.stroke(0);
        p.strokeWeight(1);
        var barColour: number[][] = [];
        barColour[0] = [255, 0, 0];
        barColour[1] = [0, 255, 0];
        barColour[2] = [0, 0, 255];

        var totalAssociations = associations.reduce((total, num) => {
            return Math.abs(total) + Math.abs(num);
        });
        for (var i = 0; i < associations.length; i++) {
            p.fill(barColour[i]);
            var barHeight = associations[i] * 100 / (totalAssociations + 1);
            var barWidth = 20;
            var leftOffset = 50;
            var topOffset = 100;
            var x = i * 50 + leftOffset;
            p.rect(x, topOffset - barHeight, barWidth, barHeight);
            p.text(Math.floor(associations[i]).toString(), x, topOffset, barWidth, topOffset);
        }
    }

    export function GraphWellbeing(wellbeing: number) {
        p.stroke(0);
        p.strokeWeight(1);
        p.fill([255, 67, 104]);
        var rightOffset = 50;
        var bottomOffset = p.windowHeight / 2;
        var barWidth = 20;
        var barHeight = wellbeing;
        var x = p.windowWidth - rightOffset;
        p.rect(x, p.windowHeight - barHeight - bottomOffset, barWidth, barHeight);
        p.text(Math.floor(wellbeing).toString(), x, p.windowHeight - bottomOffset, barWidth, bottomOffset);
    }


}