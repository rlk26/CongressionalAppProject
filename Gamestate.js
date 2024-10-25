class Gamestate{
     constructor(grid, bg, lineGoal){
         this.pos = createVector(0, 0); //gridPos
         this.grid = grid; //copies grid from constructor to class
         
         this.area = createElement('textarea'); //creates a text area
         
          if(this.grid!==null) { // if there is  a grid, display a text box and set position to grid start
            this.pos = this.grid.startPos.copy(); 
            this.vel = createVector(0,0);
            this.movementSpeed = 2.7; 
            placeHolderGIF = rightWalkingGIF;
          }

        this.textBoxDisplay(); //display textBox
        //this.area.style.display = 'none';

         
        this.bg = bg; //copies background from constructor to class
        if(bg!=null) this.bg.resize(displayWidth, displayHeight); //if there is a background, resize it
        this.lineGoal = lineGoal; //copies line goal from constructor to class
        
        //movement variables
        this.moving = false;
        this.movementTime = 0;
         
        //error variables
        this.error = false;
        this.errorMsg = "";
        
        this.attempts = 0;
        this.moves = [];
    }
     
    display() {
        image(this.bg, width/2, height/2);
        if(this.grid!=null){ //if the gamestate has a grid, display the grid
           this.grid.displayGrid();

           image(placeHolderGIF, this.pos.x, this.pos.y); //display sprite
           this.pos.add(this.vel); // change position  values
            
           this.area.position(displayWidth*3/4,0); //move textArea, maybe move eventually
        } else {
            console.log("null?" + this.grid);
            this.area.style.display = 'none';
        }     
    }  
     
    textBoxDisplay(){
        fill(255);
        this.area.elt.placeholder = 'CODE HERE OR ELSE';
        this.area.style('width', '400px');
        this.area.style('height', displayHeight);
        
    }
     
    title(){
        background(100);
        fill(255);
        rectMode(CENTER);
        rect(displayWidth/2, displayHeight/2, displayWidth/6, displayHeight/8);
        textSize(displayHeight/12);
        textAlign(CENTER, CENTER);
        fill(0);
        text("start", displayWidth/2, displayHeight/2);
        
        this.area.style.display = 'none';
    }
     
    completion(){
         //display the reached the goal box 
        rectMode(CENTER);
        fill(255, 150);
        rect(displayWidth*.4, displayHeight*.45, displayWidth/2, displayHeight*.7);
        textSize(displayHeight/12);
        textAlign(CENTER, CENTER);
        fill(0);
        text("Level Complete", displayWidth*.4, displayHeight*.15);
        textAlign(LEFT);
        textSize(50);
        text("Attempts: " + this.attempts, displayWidth*.2, displayHeight*.25);
        text("Fill In: ", displayWidth*.2, displayHeight*.35);
        circle(displayWidth*.4, displayHeight*.55, displayWidth*.06); //.23 width
        textAlign(CENTER, CENTER);
        text("Stars   Earned!", displayWidth*.4, displayHeight*.45);
        text("Main Menu", displayWidth*.27, displayHeight*.7)
        text("Next Level", displayWidth*.52, displayHeight*.7)
    }
     

     
    movement(){
    if(this.error === true) {
       text(this.errorMsg, displayWidth*.4, displayHeight/30);
    }
    if(this.error === false && this.movementTime === 0){
        if(this.moves.length > 0){
            this.movementTime = 40;
            if(this.moves[0] === "right" && this.canYouMove("right", this.grid)){
                placeHolderGIF = rightWalkingGIF;
                this.moves.shift();
                this.vel = createVector(this.movementSpeed, 0);
                this.grid.gridPos.x+=1;
            }else if(this.moves[0] === "left" && this.canYouMove("left", this.grid)){
                placeHolderGIF = leftWalkingGIF;
                this.moves.shift();
                this.vel = createVector(-this.movementSpeed, 0);
                this.grid.gridPos.x-=1;
            }else if(this.moves[0] === "up" && this.canYouMove("up", this.grid)){
                placeHolderGIF = upWalkingGIF;
                this.moves.shift();
                this.vel = createVector(0,-this.movementSpeed);
                this.grid.gridPos.y-=1;
            } else if(this.moves[0] === "down" && this.canYouMove("down", this.grid)){
                placeHolderGIF = downWalkingGIF;
                this.moves.shift();
                this.vel = createVector(0, this.movementSpeed);
                this.grid.gridPos.y+=1;
            }
            
            this.pos.add(this.vel);
            console.log(this.pos);
            console.log("start:" + this.grid.startPos);
        
        } else {
            placeHolderGIF = rightWalkingGIF;
            this.vel.x = 0;
            this.vel.y = 0;
            this.moving = false;
          
        }
    } else{
            this.movementTime -= 1;
    }
}
     //function to immediately abort test
     
checkError(words) {
    this.error = false;
    this.errorMsg = "";
    this.moves = [];
    int colon = 0; 
    let lParenCount = 0;
    let rParenCount = 0;

    // Check for semicolon
    for (let i = 0; i < words.length; i++) {
        
        if (words[i] == ';') colon++;
        if (currentLine[j] === "(") lParenCount++;
        if (currentLine[j] === ")") rParenCount++;
    }
    if (colon != 1){
        this.erroMsg = "SEMICOLON ERROR;"
        this.error = true;
        console.log(this.errorMsg);
        return:
    }

        //  Parenthesis
        if (lParenCount != 1 || rParenCount != 1){
            this.errorMsg = "PARENTHESIS ERROR";
            this.error = true;
            console.log(this.errorMsg);
            return;
        }



    if (!this.error) {
        for (let i = 0; i < words.length; i++) {
                if (words[i] === '"') quote++;
            }

        if (quote !== 2) {
            this.errorMsg = "QUOTE ERROR";
            this.error = true;
             console.log(this.errorMsg);
            return;
        }
    }

    // If no errors, set moving to true
    if (!this.error) {
        this.moving = true;
    }

    // Reset words array after processing
    words = [];
}
     
     getAreaValue(){
         return this.area.elt.value; // this isn't storing WHAT TO WORK ON 
     }
     
     
    
  canYouMove(direction, g){
    if(direction==="up"){
          if(g.gridPos.y!==0){
             if(g.gridArray[g.gridPos.y-1][g.gridPos.x] !== null){
                 return true;
             }
         }
      } 
    
    if(direction==="down"){
        if(g.gridArray[g.gridPos.y+1][g.gridPos.x] !== null){
            return true;
        }
      }  
    
    if(direction==="left"){
        if(g.gridPos.x!==0 && g.gridArray[g.gridPos.y][g.gridPos.x-1] !== null){
            return true;
        }
      }
    
    if(direction==="right"){
        if(g.gridPos.x+1<g.gridArray[g.gridPos.y].length && g.gridArray[g.gridPos.y][g.gridPos.x+1]){
           return true;
        }
          else return false;
      }  
    } 

}




