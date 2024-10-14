 class Gamestate{
     constructor(grid, bg, lineGoal){
        
         this.pos = createVector(0, 0); //current position value
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
      text("you did it", displayWidth/2, displayHeight/2);
    }
     
    movement(){
    if(this.error === true) {
       text(this.errorMsg, displayWidth*.4, displayHeight/30);
    }
    if(this.error === false && this.movementTime === 0){
        if(this.moves.length > 0){
            this.movementTime = 40;
            if(this.moves[0] === "right"){
                placeHolderGIF = rightWalkingGIF;
                this.moves.shift();
                this.vel = createVector(this.movementSpeed, 0);
                this.grid.gridPos.x+=1;
            }else if(this.moves[0] === "left"){
                placeHolderGIF = leftWalkingGIF;
                this.moves.shift();
                this.vel = createVector(-this.movementSpeed, 0);
                this.grid.gridPos.x-=1;
            }else if(this.moves[0] === "up"){
                placeHolderGIF = upWalkingGIF;
                this.moves.shift();
                this.vel = createVector(0,-this.movementSpeed);
                this.grid.gridPos.y-=1;
            } else if(this.moves[0] === "down"){
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
        } else this.error = false;
         
        
        
        if(this.error === false){
           this.moving = true;
        }
    
        //reset code
        words = [];
         
     }
     
     getAreaValue(){
         //console.log("area value: " + this.area.value());
         return this.area.elt.value; // this isn't storing WHAT TO WORK ON 
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