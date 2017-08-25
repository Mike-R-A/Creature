module Helper {
    export function MakeNoOfFoodItems(no: number): Thing[]{
        var things = [];
        for(var i = 0; i < no; i++){
            var thing = MakeRandomFoodItem();       
            things.push(thing);
        }
        return things;
    }

    export function MakeRandomFoodItem(): Thing{
        var x = RandomIntFromInterval(0,p.windowWidth);
        var y = RandomIntFromInterval(0,p.windowHeight);
        var diameter = RandomIntFromInterval(10,100);
        var strokeR = RandomIntFromInterval(0,255);
        var strokeG = RandomIntFromInterval(0,255);
        var strokeB = RandomIntFromInterval(0,255);
        var fillR = RandomIntFromInterval(0,255);
        var fillG = RandomIntFromInterval(0,255);
        var fillB = RandomIntFromInterval(0,255);
        var strokeWeight = 1;
        var thing = new Thing(x,y,diameter,diameter,[strokeR, strokeG, strokeB],
            strokeWeight,[fillR,fillG,fillB]);
        thing.smell = [10*thing.fill[0]*thing.width,10*thing.fill[1]*thing.width,
            10*thing.fill[2]*thing.width];       
        return thing;
    }

    export function RandomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    export function GraphSmell(smell: number[]){
        p.stroke(0);
        p.strokeWeight(1);
        var barColour: number[][] = [];
        barColour[0] = [255,0,0];
        barColour[1] = [0,255,0];
        barColour[2] = [0,0,255];
        
        var totalSmell = smell.reduce((total,num) => {
            return total + num;
        });
        for(var i=0; i<smell.length; i++){
            p.fill(barColour[i]);
            var barHeight = smell[i] *200/totalSmell;
            var barWidth = 20;
            var leftOffset = 50;
            var bottomOffset = 50;
            var x = i * 50 + leftOffset;
            p.rect(x, p.windowHeight - barHeight - bottomOffset, barWidth, barHeight);
            p.text(Math.floor(smell[i]).toString(), x, p.windowHeight - bottomOffset, barWidth, bottomOffset);
        }
        p.text(Math.floor(totalSmell).toString(), 10,p.windowHeight - bottomOffset, leftOffset, bottomOffset);
    }

    export function GraphWellbeing(wellbeing: number){
        p.stroke(0);
        p.strokeWeight(1);
        p.fill([255,67,104]);
        var rightOffset = 50;
        var bottomOffset = 50;
        var barWidth = 20;
        var barHeight = wellbeing;
        var x = p.windowWidth - rightOffset;
        p.rect(x, p.windowHeight - barHeight - bottomOffset, barWidth, barHeight);
        p.text(Math.floor(wellbeing).toString(), x, p.windowHeight - bottomOffset, barWidth, bottomOffset);
    }
}