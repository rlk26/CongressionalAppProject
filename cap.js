let area;
let msg;
let myArray = [];
let words = [];
let moves = [];
let error = false;
let errorMsg = "";


//movement variables
let movementSpeed = 5;
let movementTime = 0;
let moving = true;
let vel;
let pos;

let level1Grid;

var gif_loadImg, gif_createImg;
//let font;

function preload(){
    gif_createImg = createImg('testGif.gif');
    //font = loadFont('text.ttf');
}

function setup() {
    createCanvas(displayWidth, displayHeight); 
    
    //textFont(font);
    
    area = createElement('textarea');
    area.position(width*3/4,0);
    area.elt.placeholder = 'CODE HERE OR ELSE';
    area.style('width', '400px');
    area.style('height', displayHeight);
    
    vel = createVector(0,0);
    pos = createVector(50,200);
    
    level1Grid = new Grid(50, 200);
}


function draw() {   
    background(0);
 
    fill(255);
    circle(pos.x, pos.y, 100);
    
    //movement stuff
    if(moving === true){
        movement();
    }
    
    pos.add(vel);
    


    repaint(); 
    
    gif_createImg.position('10', '20');
    
    if(error === true){
        text(errorMsg, 100, 50);
    }
    
    level1Grid.displayGrid();

}

function repaint() {
    msg = area.value();
    fill(255);
    textSize(32);   
    //text(msg, 1000, 200);
}

function keyPressed(){
    if (keyCode === OPTION) { 
        error = false;
        print(area.elt.value);
        myArray.push(msg);
        words = splitTokens(msg);
        console.log(words);
        
        if(pos.x !== 50 || pos.y !== 200){
            pos = createVector(50,200);
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

//movement function
function movement(){
    if(moving === true && movementTime === 0){
        vel.x = 0;
        vel.y = 0;
        if(moves.length > 0){
            movementTime = 40;
            if(moves[0] === "right"){
                moves.shift();
                vel.x = movementSpeed;
            }else if(moves[0] === "left"){
                moves.shift();
                vel.x = -movementSpeed;
            }else if(moves[0] === "up"){
                moves.shift();
                vel.y = -movementSpeed;
            }else if(moves[0] === "down"){
                moves.shift();
                vel.y = movementSpeed;
            }
        }else{
            moving = false;
            vel.x = 0;
            vel.y = 0;
        }
    }else{
        movementTime -= 1;
    }
}

