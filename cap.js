let area;
let msg;
let myArray = [];
let words = [];
let moves = [];
let error = false;
let errorMsg = "";
let stars = false;
let lineGoal = 4;

//movement variables
let movementSpeed = 2.85;
let movementTime = 0;
let moving = true;
let vel;
let pos;
let x = 0;
let y = 0;

let gameState = 0;

let level1Grid;
let level1Goal;

var leftWalkingGIF, rightWalkingGIF, upWalkingGIF, downWalkingGIF, placeHolderGIF;
var gif_loadImg, gif_createImg;
let font;

function preload(){
    leftWalkingGIF = loadImage('leftwalking.gif');
    rightWalkingGIF = loadImage('rightwalking.gif');
    upWalkingGIF = loadImage('rightwalking.gif');
    downWalkingGIF = loadImage('frontwalking.gif');
    placeHolderGIF = loadImage('leftwalking.gif');

    //font = loadFont('text.ttf');
}

function setup() {
    createCanvas(displayWidth, displayHeight);
    
    imageMode(CENTER);
    
    //textFont(font);
    
    area = createElement('textarea');
    area.position(displayWidth*3/4,0);
    area.elt.placeholder = 'CODE HERE OR ELSE';
    area.style('width', '400px');
    area.style('height', displayHeight);
    
    vel = createVector(0,0);
    pos = createVector(displayWidth/20,displayHeight/8);

    level1Grid = new Grid(displayWidth/2, displayHeight/4, []);
    level1Goal = createVector(4, 0);
    
    leftWalkingGIF.resize(displayWidth*.05, displayHeight*.13);
    rightWalkingGIF.resize(displayWidth*.05, displayHeight*.13);
    upWalkingGIF.resize(displayWidth*.05, displayHeight*.13);
    downWalkingGIF.resize(displayWidth*.05, displayHeight*.13);
}


function draw() {
    //console.log(x + " " + y);
    background(0);
    
    if(gameState === 0){
        background (100);
        rectMode(CENTER);
        rect(displayWidth/2, displayHeight/2, displayWidth/6, displayHeight/8);
        textSize(displayHeight/12);
        textAlign(CENTER, CENTER);
        fill(0);
        text("start", displayWidth/2, displayHeight/2);
    } else if (gameState === 1){
        fill(255);
        
        if(x === level1Goal.x && y === level1Goal.y && moving === false){
           gameState += 1;
            console.log("yay");
           }
           

        removeArray = []; 
        //circle(pos.x, pos.y, displayWidth/10);
         level1Grid.removeArray = removeArray;
    for (let x = 0; x < level1Grid.gridArray.length; x++) {
    for (let y = 0; y < level1Grid.gridArray[x].length; y++) {
           //skipping row one 
            if (y !== 0) {     
                removeArray.push(new p5.Vector(x, y));
            }
        }
    }  
        level1Grid.removeArray = removeArray;
        level1Grid.displayGrid();
        image(placeHolderGIF, pos.x, pos.y);
    }else if (gameState === 2){
        text("you did it", displayWidth/2, displayHeight/2);
    }

    
        //movement stuff
        if(moving === true){
            movement();
        }
    
        pos.add(vel);
    
       

        repaint(); 
    
        //gif_createImg.position('10', '20');
    
        if(error === true){
            text(errorMsg, displayWidth/10, displayHeight/30);
        }
    
      
    }

    


function repaint() {
    msg = area.value();
    fill(255);
    textSize(displayWidth/30);   
    //text(msg, 1000, 200);
}

function keyPressed(){
    if (keyCode === OPTION) {
        stars = false;
        error = false;
        print(area.elt.value);
        myArray.push(msg);
        words = splitTokens(msg);
        console.log(words);
        
        if(words.length < lineGoal){
            stars = true;
            console.log("star earned");
        }
        
        if(pos.x !== displayWidth/20 || pos.y !== displayHeight/8){
            pos = createVector(displayWidth/20,displayHeight/8);
        }
        
        for(let i = 0; i < words.length; i++){
            let currentLine = words[i];
            let s = currentLine.substring(currentLine.length-1, currentLine.length);
            if(s !== ';'){
                console.log("SEMI COLON ERROR");
                errorMsg = "SEMI COLON ERROR";
                error = true;
            }
            let a = words[i].split("\"");
            moves[i] = a[1];
        }
        
        if(!error){
        for(let i = 0; i < words.length; i++){
            let currentLine = words[i];
            let lParen = 0;
            let rParen = 0;
            for(let i = 0; i<currentLine.length; i++){
                if(currentLine.substring(i-1, i)==="(") lParen++;
                if(currentLine.substring(i-1, i)===")") rParen++;
            }         
            if(lParen !== 1 || rParen !== 1){
                console.log("PARENTHESIS ERROR");
                errorMsg = "PARENTHESIS ERROR";
                error = true;
            } 

        }
        }
        
         
        if(!error){
        for(let i = 0; i < words.length; i++){
            let currentLine = words[i];
            let quote = 0;
            for(let i = 0; i<currentLine.length; i++){
                if(currentLine.substring(i-1, i)=== '"') quote++;
            }         
            if(quote !== 2){
                console.log("QUOTE ERROR");
                errorMsg = "QUOTE ERROR";
                error = true;
            } 

        }
        }
        
    
        
        //for people that are doing the error detection can you put an if statement around this line below so that movement only runs if there's no errors thanks squad
        
        if(error === false){
           moving = true;
        }
    
        words = [];
    }
}

function mouseClicked(){
    if (gameState === 0 && mouseX > displayWidth/2 - displayWidth/12 && mouseX < displayWidth/2 + displayWidth/12 && mouseY > displayHeight/2 - displayHeight/16 && mouseY < displayHeight/2 + displayHeight/16){
        gameState += 1;
        textAlign(LEFT, TOP);
    }
}

//movement function
function movement(){
    if(moving === true && movementTime === 0){
        vel.x = 0;
        vel.y = 0;
        if(moves.length > 0){
            movementTime = 40;
            if(moves[0] === "right"){
                placeHolderGIF = rightWalkingGIF;
                moves.shift();
                vel.x = movementSpeed;
                x += 1;
            }else if(moves[0] === "left"){
                placeHolderGIF = leftWalkingGIF;
                //image(leftWalkingGIF, pos.x, pos.y);
                moves.shift();
                vel.x = -movementSpeed;
                x -= 1;
            }else if(moves[0] === "up"){
                placeHolderGIF = upWalkingGIF;
                moves.shift();
                vel.y = -movementSpeed;
                y -= 1;
            }else if(moves[0] === "down"){
                placeHolderGIF = downWalkingGIF;
                moves.shift();
                vel.y = movementSpeed;
                y += 1;
            }
        }else{
            moving = false;
            placeHolderGIF = rightWalkingGIF;
            vel.x = 0;
            vel.y = 0;
        }
    }else{
        movementTime -= 1;
    }
}

