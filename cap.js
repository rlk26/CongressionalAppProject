let area;
let msg;
let myArray = [];
let words = [];
let moves = [];
let error = false;

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
        error = false;
        print(area.elt.value);
        myArray.push(msg);
        words = splitTokens(msg);
        console.log(words);
        
        for(let i = 0; i < words.length; i++){
            let currentLine = words[i];
            let s = currentLine.substring(currentLine.length-1, currentLine.length);
            if(s !== ';'){
                console.log("SEMI COLON ERROR");
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
                error = true;
            } 

        }
        }

        /*for(let i = 0; i < words.length; i++){
            let currentLine = words[i];
            let quoteSplit = splitTokens(currentLine, '(');
            console.log("QUOTE SPLIT 1" + quoteSplit[1]);
            if(quoteSplit[1] !== '"'){
                console.log("QUOTE ERROR");
                error = true;
            }
            let a = words[i].split("\"");
            moves[i] = a[1];
        }*/
        
        
    
        
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