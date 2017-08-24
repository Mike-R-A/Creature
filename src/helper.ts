module Helper {
    export function MakeFood(no: number): Thing[]{
        var things = [];
        for(var i = 0; i < no; i++){
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
            things.push(new Thing(x,y,diameter,diameter,[strokeR, strokeG, strokeB],
                strokeWeight,[fillR,fillG,fillB]));
        }
        return things;
    }

    export function RandomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
}