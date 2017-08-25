class World {
    Things: Thing[];
    NoOfSmellTypes = 3;
    draw(){
        p.background([176,224,255]);
    }
    getSmellAtPosition(x: number,y: number):number[]{
        var smellAtPosition: number[] = [];
        for(var i=0;i<this.NoOfSmellTypes;i++){
            smellAtPosition.push(0);
            this.Things.forEach(thing => {
                var distanceSquared = Math.pow(thing.x - x, 2) + Math.pow(thing.y - y,2);
                if(distanceSquared<1){
                    distanceSquared = 1;
                }
                smellAtPosition[i] += thing.smell[i] / distanceSquared             
            });
        }
        return smellAtPosition;
    }
}