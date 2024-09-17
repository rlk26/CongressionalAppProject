 class Grid{


    constructor(g, b){
        this.g = g;
        this.b = b;
        this.gridSize = 200;
        this.gridArray = [1,2];
        console.log(this.gridArray);
        
    
        
    }

    displayGrid(){
    this.gridArray = [];
    for(let x = 50; x<displayWidth/2; x+=this.gridSize){
    for(let y = 200; y<displayHeight; y+=this.gridSize){
         if (!this.gridArray[x]) {
                    this.gridArray[x] = [];
                }
                this.gridArray[x][y] = true; // or some value
        
        //this.gridArray[x] =[];
       // this.gridArray[y] =[];
        //console.log(this.gridArray);
         fill(255,0,0);
    circle(x, y, 50); 
    }
  
    }
    }
    
}