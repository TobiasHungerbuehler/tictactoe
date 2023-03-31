let fields = [];
let currrentShape = 'cross';
let emptyList = [];
let computer = true;
let gameOver = false;
let winner;
let moves = 0;


function fillShape(id) {
    checkMoves();
    if(!fields[id] && !gameOver) {
        if(currrentShape == 'cross') {
            currrentShape = 'circle';
            activatePlayer2();    
            computer = true;
        } else {
            currrentShape = 'cross'; 
            activatePlayer1();
            computer = false;
        }
        fields[id] = currrentShape;
        draw();   
    }
} 


function checkMoves() {
    moves++;
    if(moves >= 9) {
        gameOverDisplay();
    }
}


function activatePlayer2() {
    document.getElementById('player-2').classList.remove('player-inactive');
    document.getElementById('player-1').classList.add('player-inactive');
}


function activatePlayer1() {
    document.getElementById('player-1').classList.remove('player-inactive');
    document.getElementById('player-2').classList.add('player-inactive');
}


function draw() {
    for (let i = 0; i < fields.length; i++) {
        if(fields[i] == 'circle') {
            document.getElementById('circle-' +i).classList.remove('d-none');
        }
        if(fields[i] == 'cross') {
            document.getElementById('cross-' +i).classList.remove('d-none');
        }
    }
    checkForWin();
}


function checkForWin() {
    checkHorizontal();
    checkVertical();
    checkDiagonal();
    if (winner) {
        gameOver = true;
        setTimeout(gameOverDisplay, 1500) 
    } else {
        document.getElementById('overlay').classList.add('overlay');
        setTimeout(computerPlayer, 400)
    }
}


function gameOverDisplay() {
    document.getElementById('game-over').classList.remove('d-none');
    document.getElementById('game-over-img').classList.remove('d-none');
    document.getElementById('restart-btn').classList.remove('d-none');
}


function checkHorizontal() {
    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-0').classList.remove('d-none');
        document.getElementById('line-0').style.transform = 'scaleX(1)';
    }
    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        winner = fields[3];
        document.getElementById('line-1').classList.remove('d-none');
        document.getElementById('line-1').style.transform = 'scaleX(1)';
    }
    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        winner = fields[6];
        document.getElementById('line-1').classList.remove('d-none');
        document.getElementById('line-2').style.transform = 'scaleX(1)';
    }
}


function checkVertical() {
    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-3').classList.remove('d-none');
        document.getElementById('line-3').style.transform = 'rotate(90deg) scaleX(1)';
    }
    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        winner = fields[1];
        document.getElementById('line-4').classList.remove('d-none');
        document.getElementById('line-4').style.transform = 'rotate(90deg) scaleX(1)';
    }
    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-5').classList.remove('d-none');
        document.getElementById('line-5').style.transform = 'rotate(90deg) scaleX(1)';
    }
}


function checkDiagonal() {
    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-6').classList.remove('d-none');
        document.getElementById('line-6').style.transform = 'rotate(45deg) scaleX(1)';
    }
    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-7').classList.remove('d-none');
        document.getElementById('line-7').style.transform = 'rotate(-45deg) scaleX(1)';
    }
}


function restart() {
    gameOver = false;
    fields = [];
    emptyList = [];
    computer = true;
    currrentShape = 'cross';
    activatePlayer1();
    winner = false;
    moves = 0;
    removeGameOver();
}


function removeGameOver(){
    document.getElementById('game-over').classList.add('d-none');
    document.getElementById('game-over-img').classList.add('d-none');
    document.getElementById('restart-btn').classList.add('d-none');
    removeLines();
}


function removeLines() {
    for (let i = 0; i < 8; i++) {
        document.getElementById('line-' +i).classList.add('d-none'); 
    }
    removeShapes();
}


function removeShapes() {
    for (let i = 0; i <= 8; i++) {
        document.getElementById('circle-' +i).classList.add('d-none'); 
        document.getElementById('cross-' +i).classList.add('d-none'); 
    }
}


function computerPlayer() {
    if (computer == true){
        for (let i = 0; i < 8; i++) {
            if(!fields[i]) {
                emptyList.push(i)
            }  
        }    
        let randomElement = getRandomElement(emptyList);      
        fillShape(randomElement);
        emptyList = [];
    }
    document.getElementById('overlay').classList.remove('overlay');
}


function getRandomElement(emptyList) {
    return emptyList[Math.floor(Math.random() * emptyList.length)];
  }






