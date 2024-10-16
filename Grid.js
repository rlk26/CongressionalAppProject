class Grid{
    constructor(removeArray, goal, startPos, gridPos){
        this.gridSize = displayHeight/8;
        this.gridArray = [];
        this.removeArray = removeArray;
        this.cols = Math.floor((displayWidth / 2 - displayWidth / 20) / this.gridSize);
        this.rows = Math.floor((displayHeight - displayHeight / 8) / this.gridSize);
        this.goal = goal;
        
        //need to do .copy() to save value instead of just assign variable
        this.startPos = startPos.copy();
        this.gridPos = gridPos.copy();
        this.gridStart = gridPos.copy();
    }
     
    displayGrid() {
        //create a grid
        this.createGrid(this.rows, this.cols);
        
        //remove removeArray
        this.removeElements();
        
        //if there is a grid piece, display the grid
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.gridArray[y][x] === true) {
                    let posX = displayWidth / 20 + x * this.gridSize;
                    let posY = displayHeight / 8 + y * this.gridSize;
                    
                    fill(255, 0, 0);
                    circle(posX, posY, displayWidth / 30);
                }
            }
        }
    }    
     
     createGrid(cols, rows){
        //make full array
        for (let y = 0; y < this.rows; y++) {
            this.gridArray[y] = [];
            for (let x = 0; x < this.cols; x++) {
                this.gridArray[y][x] = true;
            }
        }
         
     }
     
     removeElements(){
        if(this.removeArray!== []){
        for (let i = 0; i < this.removeArray.length; i++) {
            let removing = this.removeArray[i];
            //converting to grid positions
            let x = removing.x;
            let y = removing.y;
          
            if (this.gridArray[y][x] && this.removeArray[y][x] === true){
                 this.gridArray[y][x] = null;
                }
                
            }
    
        }
     }
     
    checkGoal(moving){
       //checks the goalPos with your grid Position
        if(this.gridPos.x == this.goal.x && this.gridPos.y == this.goal.y && moving == false){
          console.log("Goal reached.");
          return true; //returns true if you met goal
        } else return false; //returns false if you haven't met goal
        
         
     }
     
     
 }