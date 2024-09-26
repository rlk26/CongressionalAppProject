 class Gamestate{
     constructor(grid, bg, lineGoal){
        
         this.pos = createVector(0, 0);
         
         this.grid = grid; if(this.grid!=null) { // if there is  agrid, display a text box and set position to grid start
            this.textBoxDisplay();
            this.pos = this.grid.startPos;
            this.vel = createVector(0,0);
            placeHolderGIF = rightWalkingGIF;
            
        } 
        this.bg = bg;
        if(bg!=null) this.bg.resize(displayWidth, displayHeight);
        this.lineGoal = lineGoal;
        
        this.moving = true;
        this.movementTime = 0; //matter?
        
        this.area = createElement('textarea');
         

        this.error = false;
        this.errorMsg = "";
         
        this.moves = [];
    }
     
    display() {
        image(this.bg, width/2, height/2);
        if(this.grid!=null){ //if the gamestate has a grid, display the grid
           this.grid.displayGrid();
           image(placeHolderGIF, this.pos.x, this.pos.y);
           this.pos.add(this.vel);
            
            
            if(this.pos.x !== displayWidth/20 ||this.pos.y !== displayHeight/8){ //resets position
            this.pos = createVector(displayWidth/20,displayHeight/8);
            this.grid.gridPos.x = this.grid.startPos;
            this.grid.gridPos.y = this.grid.startPos;
        }
        }
        
        
       
    }  
     
    textBoxDisplay(){
        fill(255);
        this.area = createElement('textarea');
        this.area.position(displayWidth*3/4,0);
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
    }
     
    completion(){
      text("you did it", displayWidth/2, displayHeight/2);
    }
     
     



    movement(){
    if(error === true) text(this.errorMsg, displayWidth/10, displayHeight/30);
    
    if(this.moving === true && this.error === false){

        this.vel.x = 0;
        this.vel.y = 0;
        console.log(this.moves);
        if(this.moves.length > 0){
            console.log("test");
            this.movementTime = 40;
            if(this.moves[0] === "right"){
               placeHolderGIF = rightWalkingGIF;
                this.moves.shift();
                this.vel.x = this.movementSpeed;
                this.grid.gridPos.x += 1;
               
            }else if(this.moves[0] === "left"){
               placeHolderGIF = leftWalkingGIF;
                //image(leftWalkingGIF, pos.x, pos.y);
                this.moves.shift();
            }else if(this.moves[0] === "up"){
               placeHolderGIF = upWalkingGIF;
                this.moves.shift();
            } else if(this.moves[0] === "down"){
               placeHolderGIF = downWalkingGIF;
                this.moves.shift();
            }
        }else{
            this.moving = false;
            placeHolderGIF = rightWalkingGIF;
            this.vel.x = 0;
            this.vel.y = 0;
        }
    } else{
        this.movementTime -= 1;
    }
}
     
     
     checkError(words){
          for(let i = 0; i < words.length; i++){
            let currentLine = words[i];
            let s = currentLine.substring(currentLine.length-1, currentLine.length);
            if(s !== ';'){
                this.errorMsg = "SEMI COLON ERROR";
                this.error = true;
            }
            let a = words[i].split("\"");
            this.moves[i] = a[1];
              
        }
        
        if(!this.error){
            for(let i = 0; i < words.length; i++){
                let currentLine = words[i];
                let lParen = 0;
                let rParen = 0;
                for(let i = 0; i<currentLine.length; i++){
                    if(currentLine.substring(i-1, i)==="(") lParen++;
                    if(currentLine.substring(i-1, i)===")") rParen++;
                }         
                if(lParen !== 1 || rParen !== 1){
                   this.errorMsg = "PARENTHESIS ERROR";
                   this.error = true;
                } 
            }
        }
        
         
        if(!this.error){
            for(let i = 0; i < words.length; i++){
                let currentLine = words[i];
                let quote = 0;
                for(let i = 0; i<currentLine.length; i++){
                    if(currentLine.substring(i-1, i)=== '"') quote++;
                }         
                if(quote !== 2){
                    this.errorMsg = "QUOTE ERROR";
                      console.log(this.errorMsg);
                    this.error = true;
                } 
            }
        }
        
        if(this.error === false){
           this.moving = true;
        }
    
        //reset code
        words = [];
         
     }
     
 }
 
         /*removeArray = []; 
        level1Grid.removeArray = removeArray;
        
        for (let i = 0; i < level1Grid.gridArray.length; i++) {
            for (let j = 0; j < level1Grid.gridArray[i].length; j++) {
                //skipping row one 
                if (j!== 0) {     
                    removeArray.push(new p5.Vector(i, j));
                }
            }
        }  
        
           level1Grid.removeArray = removeArray;
            level1Grid.displayGrid();
        
        */ //from gs1 in og code