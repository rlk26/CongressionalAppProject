 class Grid{
    constructor(g, b, removeArray){
        this.g = g;
        this.b = b;
        this.gridSize = displayHeight/8;
        this.gridArray = [];
        this.removeArray =removeArray || [];
        console.log(this.gridArray); 
    }
     
    displayGrid() {
        this.gridArray = [];
        let cols = Math.floor((displayWidth / 2 - displayWidth / 20) / this.gridSize);
        let rows = Math.floor((displayHeight - displayHeight / 8) / this.gridSize);
    
        for (let x = 0; x < cols; x++) {
            this.gridArray[x] = [];
            for (let y = 0; y < rows; y++) {
                this.gridArray[x][y] = true;
            }
        }
        this.removeElements();
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                if (this.gridArray[i][j] === true) {
                    let posX = displayWidth / 20 + i * this.gridSize;
                    let posY = displayHeight / 8 + j * this.gridSize;
                    fill(255, 0, 0);
                    circle(posX, posY, displayWidth / 30);
                }
            }
        }
    }    
     
     removeElements(){
        for (let i = 0; i < this.removeArray.length; i++) {
            let removing = this.removeArray[i];
            //converting to grid positions
            let x = removing.x;
            let y = removing.y;
            if (this.gridArray[x] &&this.gridArray[x][y] === true){
                 this.gridArray[x][y] = null;
            }
                
        }
    
     }
     
    /*function canYouMove(direction: string, currentPos: p5.Vector) boolean {
         if(direction==="up"){
             //check if there is a value above the current Pos.y
             if(this.gridArray[currentPos.x][currentPos.y-1] !== null){
                 return true;
             } else return false;
         }
     }*/
}

    //old display grid function

   /* displayGrid(){
    this.gridArray = [];
    for(let x = displayWidth/20; x<displayWidth/2; x+=this.gridSize){
    for(let y = displayHeight/8; y<displayHeight; y+=this.gridSize){
         if (!this.gridArray[x]) {
        this.gridArray[x] = [];
                }
                this.gridArray[x][y] = true;
   
    }
  
    } this.removeElements();
      for (let x = displayWidth / 20; x < displayWidth / 2; x += this.gridSize) {
      for (let y = displayHeight / 8; y < displayHeight; y += this.gridSize) {
                if (this.gridArray[x] && this.gridArray[x][y] === true) {
                  let posX = displayWidth / 20 + x * this.gridSize;
                  let posY = displayHeight / 8 + y * this.gridSize;
                  fill(255, 0, 0);
                  circle(posX, posY, displayWidth / 30);
                    
                    // fill(255, 0, 0);
                   // circle(x, y, displayWidth / 30);
                }
            }
    }
    }*/