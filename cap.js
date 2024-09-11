let area;
let msg;
let myArray = [];
let words = [];
let moves = [];

//movement variables
let movementSpeed = 4;
let movementTime = 0;
let moving = true;
let xVel = 0;
let yVel = 0;


function setup() {
createCanvas(displayWidth, displayHeight); 
    
area = createElement('textarea');
area.position(width*3/4,0);
area.elt.placeholder = 'CODE HERE OR ELSE';
area.style('width', '400px');
area.style('height', displayHeight);
}

let x = 50;
let y = 200;

function draw() {   
    background(0);
    circle(x, y, 100);
    
    //movement stuff
    if(moving === true){
        movement();
    }
    
    x += xVel;
    y += yVel;
    
  

    repaint(); 
}

function repaint() {
    msg = area.value();
    fill(255);
    textSize(32);   
    //text(msg, 1000, 200);
}

function keyPressed(){
    if (keyCode === OPTION) { 
        print(area.elt.value);
        myArray.push(msg);
        words = splitTokens(msg);
        console.log(words);
        
        for(let i = 0; i < words.length; i++){
            let currentLine = words[i];
            let semiSplit = splitTokens(currentLine, ')');
            console.log("SEMI SPLIT 1" + semiSplit[1]);
            if(semiSplit[1] !== ';'){
                console.log("SEMI COLON ERROR");
                break; 
            }
            let a = words[i].split("\"");
            moves[i] = a[1];
        }
        
        //for people that are doing the error detection can you put an if statement around this line below so that movement only runs if there's no errors thanks squad
        moving = true;
        
        words = [];
    }
}

//movement function
function movement(){
    if(moving === true && movementTime === 0){
        xVel = 0;
        yVel = 0;
        if(moves.length > 0){
            movementTime = 40;
            if(moves[0] === "right"){
                moves.shift();
                xVel = movementSpeed;
            }else if(moves[0] === "left"){
                moves.shift();
                xVel = -movementSpeed;
            }else if(moves[0] === "up"){
                moves.shift();
                yVel = -movementSpeed;
            }else if(moves[0] === "down"){
                moves.shift();
                yVel = movementSpeed;
            }
        }else{
            moving = false;
            xVel = 0;
            yVel = 0;
        }
    }else{
        movementTime -= 1;
    }
}