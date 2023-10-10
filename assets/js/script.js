// CREATE THE GAME GRID

const gridContainer = document.getElementById('grid');
let gridCreated = false;

function createGrid() {

    for(let i = 1; i <= 200; i++) {
        const div = document.createElement('div');
        div.classList.add('grid-item');
        div.setAttribute('data-number', i);
        gridContainer.appendChild(div);

        gridCreated = true;
    }
}

if(!gridCreated) {
    createGrid();
}

// CREATE MATRIX 

let matrix = [];
matrixCreated = false;

function createMatrix() {

    let mat = [];

    for(let i = 0; i < 20; i++) {
        mat[i] = [];
        
        for(let j = 0; j < 10; j++) {
            mat[i][j] = 0;
        }
    }

    matrixCreated = true;

    return mat;
}

if(!matrixCreated) {
    matrix = createMatrix();
}

// UPDATE GRID FROM MATRIX

function updateGrid() {

    let itemCounter = 1
    
    for(let i = 0; i < 20; i++) {

        for(let j = 0; j < 10; j++) {
            let gridItem = document.querySelector(`.grid-item[data-number="${itemCounter}"]`);
            
            if(matrix[i][j] !== 0) {

                switch (Math.abs(matrix[i][j])) {

                    case 1:
                        gridItem.classList.add('red')

                        gridItem.classList.remove('light-blue', 'blue', 'purple', 'yellow', 'green', 'orange', 'white')
                        break;

                    case 2:
                        gridItem.classList.add('light-blue')

                        gridItem.classList.remove('blue', 'purple', 'yellow', 'green', 'orange', 'white', 'red')
                        break;

                    case 3:
                        gridItem.classList.add('blue')

                        gridItem.classList.remove('light-blue', 'purple', 'yellow', 'green', 'orange', 'white', 'red')
                        break;

                    case 4:
                        gridItem.classList.add('purple')

                        gridItem.classList.remove('light-blue', 'blue', 'yellow', 'green', 'orange', 'white', 'red')
                        break;

                    case 5:
                        gridItem.classList.add('yellow')

                        gridItem.classList.remove('light-blue', 'blue', 'purple', 'green', 'orange', 'white', 'red')
                        break;

                    case 6:
                        gridItem.classList.add('green')

                        gridItem.classList.remove('light-blue', 'blue', 'purple', 'yellow', 'orange', 'white', 'red')
                        break;

                    case 7:
                        gridItem.classList.add('orange')

                        gridItem.classList.remove('light-blue', 'blue', 'purple', 'yellow', 'green', 'white', 'red')
                        break;

                    default:
                        break;
                  }
            }

            if(matrix[i][j] === 0) {
                gridItem.classList.remove('red', 'light-blue', 'blue', 'purple', 'yellow', 'green', 'orange', 'white');
            }

            itemCounter++;
        }
    }
}

updateGrid();

// TETROMINOS

const I = [
    [0, 0, 0, 0],
    [2, 2, 2, 2],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

const J = [
    [3, 0, 0],
    [3, 3, 3],
    [0, 0, 0]
];

const L = [
    [0, 0, 7],
    [7, 7, 7],
    [0, 0, 0]
];

const O = [
    [5, 5],
    [5, 5]
];

const S = [
    [0, 6, 6],
    [6, 6, 0],
    [0, 0, 0]
];

const T = [
    [0, 4, 0],
    [4, 4, 4],
    [0, 0, 0]
];

const Z = [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
];

// PICK TETRONIMOS

let recentNumbers = [];
const min = 1;
const max = 7;
let currentPiece;
let nextPiece;
let temp;

function randomNumber() {
    let randomNumber;

    do {
        randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    } while (recentNumbers.includes(randomNumber));

    recentNumbers.push(randomNumber);

    if (recentNumbers.length > 3) {
        recentNumbers.shift();
    }

    return randomNumber;
}

let dim;
let rotationState;

function pickTetrominos() {
    
    if (nextPiece === undefined) {
        nextPiece = generateNextPiece();
    }

    currentPiece = nextPiece;
    nextPiece = generateNextPiece();

    nextPieceViewer();

    switch (currentPiece) {
        case 1:
            temp = I;
            dim = 4;
            break;

        case 2:
            temp = J;
            dim = 3;
            break;

        case 3:
            temp = L;
            dim = 3;
            break;

        case 4:
            temp = O;
            dim = 2;
            break;

        case 5:
            temp = S;
            dim = 3;
            break;

        case 6:
            temp = T;
            dim = 3;
            break;

        case 7:
            temp = Z;
            dim = 3;
            break;

        default:
            break;
    }

    return dim;
}

function generateNextPiece() {

    let num = randomNumber();
    return num;
}

// NEXT PIECE

let tempViewer;
let dimViewer;
let colorViewer;

function nextPieceViewer() {

    switch (nextPiece) {
        case 1:
            tempViewer = I;
            dimViewer = 4;
            colorViewer = 'light-blue';
            break;

        case 2:
            tempViewer = J;
            dimViewer = 3;
            colorViewer = 'blue';
            break;

        case 3:
            tempViewer = L;
            dimViewer = 3;
            colorViewer = 'orange';
            break;

        case 4:
            tempViewer = O;
            dimViewer = 2;
            colorViewer = 'yellow';
            break;

        case 5:
            tempViewer = S;
            dimViewer = 3;
            colorViewer = 'green';
            break;

        case 6:
            tempViewer = T;
            dimViewer = 3;
            colorViewer = 'purple';
            break;

        case 7:
            tempViewer = Z;
            dimViewer = 3;
            colorViewer = 'red';
            break;

        default:
            break;
    }

    const gridDiv = document.querySelector('.grid-next');

    while (gridDiv.firstChild) {
        gridDiv.removeChild(gridDiv.firstChild);
    }

    if(dimViewer === 2) {

        gridDiv.style.gridTemplateColumns = 'repeat(2, 1fr)';
        gridDiv.style.gridTemplateRows = 'repeat(2, 1fr)';
        gridDiv.style.width = '33.3%';

        for(let i = 0; i < dimViewer; i++) {

            for(let j = 0; j < dimViewer; j++) {

                const elementDiv = document.createElement('div');
                elementDiv.classList.add('grid-next-item')
                
                if(tempViewer[i][j] !== 0) {
                    elementDiv.classList.add(colorViewer)
                }

                gridDiv.appendChild(elementDiv);
            }
        }
    }

    if(dimViewer === 3) {

        gridDiv.style.gridTemplateColumns = 'repeat(3, 1fr)';
        gridDiv.style.gridTemplateRows = 'repeat(2, 1fr)';
        gridDiv.style.width = '50%';

        for(let i = 0; i < dimViewer - 1; i++) {

            for(let j = 0; j < dimViewer; j++) {

                const elementDiv = document.createElement('div');
                elementDiv.classList.add('grid-next-item')
                
                if(tempViewer[i][j] !== 0) {
                    elementDiv.classList.add(colorViewer)
                }

                gridDiv.appendChild(elementDiv);
            }
        }
    }

    if(dimViewer === 4) {

        gridDiv.style.gridTemplateColumns = 'repeat(4, 1fr)';
        gridDiv.style.gridTemplateRows = 'repeat(1, 1fr)';
        gridDiv.style.width = '66.6%';

        for(let i = 1; i < dimViewer - 2; i++) {

            for(let j = 0; j < dimViewer; j++) {

                const elementDiv = document.createElement('div');
                elementDiv.classList.add('grid-next-item')
                
                if(tempViewer[i][j] !== 0) {
                    elementDiv.classList.add(colorViewer)
                }

                gridDiv.appendChild(elementDiv);
            }
        }
    }
}

// CHECK IF CAN SPAWN

let tetrominosPosition; 

function checkSpawn(dimension) {

    let starting = Math.floor(5 - (dimension/2));

    let row = 0;

    for(let i = 0; i < 2; i++) {
        
        let column = 0;

        for(let j = starting; j < starting + dimension; j++) {

            if(temp[row][column] !== 0 && matrix[i][j] !== 0) {

                return false;
            }

            if(temp[row][column] !== 0 && matrix[i][j] === 0) {
                matrix[i][j] = temp[row][column];
            }

            column++;
        }

        row++;
    }

    return true;
}

// MOVE RIGHT TETRONIMOS

function moveRight() {

    let canMove = false;

    for(let i = 0; i < 20; i++) {
        
        for(let j = 0; j < 10; j++) {

            if(matrix[i][j] > 0) {
                
                if(matrix[i][j+1] < 0 || matrix[i][j+1] === undefined) {
                    canMove = false;
                    return;
                }
            }     
        }
    }

    canMove = true;

    if(canMove) {

        for(let i = 0; i < 20; i++) {
            
            for(let j = 9; j >= 0; j--) {
    
                if(matrix[i][j] > 0) {
                    
                    matrix[i][j+1] = matrix[i][j];
                    matrix[i][j] = 0;
                }     
            }
        }
    }

    tetrominosPosition.col++;

    updateGrid();

    return;
}

// MOVE LEFT TETRONIMOS

function moveLeft() {

    let canMove = false;

    for(let i = 0; i < 20; i++) {
        
        for(let j = 0; j < 10; j++) {

            if(matrix[i][j] > 0) {
                
                if(matrix[i][j-1] < 0 || matrix[i][j-1] === undefined) {
                    canMove = false;
                    return;
                }
            }     
        }
    }
    canMove = true;


    if(canMove) {

        for(let i = 0; i < 20; i++) {
            
            for(let j = 0; j < 10; j++) {
    
                if(matrix[i][j] > 0) {
                    
                    matrix[i][j-1] = matrix[i][j];
                    matrix[i][j] = 0;
                }     
            }
        }
    }

    tetrominosPosition.col--;

    updateGrid();

    return;
}


let arrowLeftPressed = false;
let arrowRightPressed = false;
let repeatInterval;

// Function to start repeating movement
function startRepeat(callback) {
    if (repeatInterval) clearInterval(repeatInterval);
    repeatInterval = setInterval(() => {
        if (arrowLeftPressed) {
            moveLeft();
        }
        if (arrowRightPressed) {
            moveRight();
        }
    }, 80);
}

// Add touch event listeners for left and right touch movements
const touchArea = document.querySelector('.grid'); // Replace with your touch area element
let touchStartX = null; // Initialize to null to track the first touch

touchArea.addEventListener('touchstart', (event) => {

    if(!pause) {
        touchStartX = event.touches[0].clientX;
        event.preventDefault(); // Prevent scrolling on touch devices
    }
});

touchArea.addEventListener('touchmove', (event) => {

    if(!pause) {

        event.preventDefault(); // Prevent scrolling on touch devices
    
        if (touchStartX !== null) {
            const touchCurrentX = event.touches[0].clientX;
            const touchDeltaX = touchCurrentX - touchStartX;
    
            const threshold = 35;
    
            if (touchDeltaX < -threshold && !arrowLeftPressed) {
                arrowLeftPressed = true;
                arrowRightPressed = false;
                moveLeft();
                startRepeat(moveLeft);
            } else if (touchDeltaX > threshold && !arrowRightPressed) {
                arrowLeftPressed = false;
                arrowRightPressed = true;
                moveRight();
                startRepeat(moveRight);
            }
        }
    }
});

touchArea.addEventListener('touchend', () => {

    if(!pause) {
        arrowLeftPressed = false;
        arrowRightPressed = false;
        clearInterval(repeatInterval);
        touchStartX = null; // Reset touchStartX
    }
});

document.addEventListener('keydown', (event) => {

    if(!pause) {

        if (event.key === 'ArrowLeft' || event.key === 'a') {
            if (!arrowLeftPressed) {
                arrowLeftPressed = true;
                moveLeft();
                startRepeat(moveLeft);
            }
            if (arrowRightPressed) {
                arrowRightPressed = false;
                clearInterval(repeatInterval);
            }
        }
    
        if (event.key === 'ArrowRight' || event.key === 'd') {
            if (!arrowRightPressed) {
                arrowRightPressed = true;
                moveRight();
                startRepeat(moveRight);
            }
            if (arrowLeftPressed) {
                arrowLeftPressed = false;
                clearInterval(repeatInterval);
            }
        }
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'a') {

        if(!pause) {
            arrowLeftPressed = false;
            if (arrowRightPressed) {
                startRepeat(moveRight);
            } else {
                clearInterval(repeatInterval);
            }
        }
    }

    if (event.key === 'ArrowRight' || event.key === 'd') {
        arrowRightPressed = false;
        if (arrowLeftPressed) {
            startRepeat(moveLeft);
        } else {
            clearInterval(repeatInterval);
        }
    }
});

// ROTATION TETRONIMOS

function checkRotation() {

    if(tetrominosPosition.col > 7 || tetrominosPosition.col < 0 || tetrominosPosition.row >= (20 - dim) || dim === 2) {

        return false;
    }

    let row = tetrominosPosition.row;
    let col = tetrominosPosition.col;

    for (let i = 0; i < dim; i++) {

        col = tetrominosPosition.col;

        for (let j = 0; j < dim; j++) {
            
            if(matrix[row][col] < 0) {

                return false;
            }
            col++;

        }
        row++;
    }

    return true;
}

function rotateTetromino() {

    if(checkRotation()) {

        let rotatedPiece = [];

        for (let row = 0; row < dim; row++) {
            rotatedPiece[row] = [];
            for (let col = 0; col < dim; col++) {
                rotatedPiece[row][col] = temp[col][row];
            }
        }

        // Reverse rows
        for (let i = 0; i < dim; i++) {
            rotatedPiece[i].reverse();
        }

        // Update the temp array for the next rotation
        temp = rotatedPiece;

        let row = tetrominosPosition.row;
        let col = tetrominosPosition.col;

        for (let i = 0; i < dim; i++) {

            for (let j = 0; j < dim; j++) {
                
                if (matrix[row + i][col + j] >= 0) {  // Skip confirmed pieces
                    
                    matrix[row + i][col + j] = rotatedPiece[i][j];
                }
            }
        } 

        isRotated = true;

        updateGrid();
        
        return;

    } else {

        return;

    }
}

let rotationCooldown = false;
let touchX;
let touchY;

document.addEventListener('keydown', (event) => {
    if ((event.key === 'ArrowUp' || event.key === 'w') && !rotationCooldown) {

        if(!pause) {
            rotateTetromino();
            rotationCooldown = true;
            setTimeout(() => {
                rotationCooldown = false;
            }, 100); 
        }
    }
});

touchArea.addEventListener('touchstart', (event) => {

    if(!pause) {
        // Record the touch start coordinates
        touchX = event.touches[0].clientX;
        touchY = event.touches[0].clientY;
    }
});

// Touchend event listener for mobile touch
touchArea.addEventListener('touchend', (event) => {

    if(!pause) {
        // Get the touch end coordinates
        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;
    
        // Calculate the distance between start and end points
        const distance = Math.sqrt((touchEndX - touchX) ** 2 + (touchEndY - touchY) ** 2);
    
        // Check if the touch is a tap (small distance)
        if (distance < 10 && !rotationCooldown) {  // Adjust the threshold (10 pixels in this example)
            rotateTetromino();
            rotationCooldown = true;
            setTimeout(() => {
                rotationCooldown = false;
            }, 100);
        }
    }
});

// MOVE DOWN TETRONIMOS

let delay = 600;
let isRotated;

function moveDown() {

    let canMove = true;

    for(let i = 19; i >= 0; i--) {
        
        for(let j = 0; j < 10; j++) {

            if(matrix[i][j] > 0) {
                
                if(i === 19 || matrix[i+1][j] < 0 ) {
                    canMove = false;

                    confirmPiece();

                    return false;
                }
            }     
        }
    }

    if (canMove) {
        
        for(let i = 18; i >= 0; i--) {
    
            for(let j = 0; j < 10; j++) {
    
                if(matrix[i][j] > 0) {

                    matrix[i+1][j] = matrix[i][j];
                    matrix[i][j] = 0;
                }     
            }
        }
    } 

    tetrominosPosition.row++;

    let row = tetrominosPosition.row - 1;
    let col = tetrominosPosition.col - 1;      
    
    if(isRotated) {

        for (let i = 0; i < dim + 2; i++) {
    
            for (let j = 0; j < dim + 2; j++) {
                
                if(i === 0 || i === dim + 1 || j === 0 || j === dim + 1) {
    
                    if(col > 0 && col < 10 && row > 0 && row < 20) {
    
                        if(matrix[row][col] > 0) {

                            matrix[row][col] = 0;
                        }
                    }
                }
    
                col++;
    
            }
    
            row++;
        }

        isRotated = !isRotated
    }

    if(delay === 30) {
        score++;
    }

    setTimeout(() => {
        updateGrid();

        scoreText.innerHTML = score.toLocaleString('en-US', { useGrouping: true });
        scoreTextMin.innerHTML = score.toLocaleString('en-US', { useGrouping: true });

    }, delay);

    return true;
}

// ACCELERATE MOVE DOWN

let resetDelay = delay;
let downArrowPressed = false;

// Function to set the delay when the down arrow key is pressed
function setDelayWhileDownArrowPressed() {
    if (!downArrowPressed) {
        resetDelay = delay;
        delay = 30;
        downArrowPressed = true;
    }
}

// Function to reset the delay when the down arrow key is released
function resetDelayAfterRelease() {
    if (downArrowPressed) {
        delay = resetDelay; // Reset delay to its initial value
        downArrowPressed = false;
    }
}

// Add event listeners for the down arrow key
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {

        if(!pause) {
            setDelayWhileDownArrowPressed();
        }
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowDown') {

        if(!pause) {
            resetDelayAfterRelease();
        }
    }
});

let touchStartY = null; // Initialize to null to track the first touch

touchArea.addEventListener('touchstart', (event) => {

    if(!pause) {

        touchStartY = event.touches[0].clientY;
        event.preventDefault(); // Prevent scrolling on touch devices
    }
});

touchArea.addEventListener('touchmove', (event) => {

    if(!pause) {

        event.preventDefault(); // Prevent scrolling on touch devices
    
        // Check if touch is still within the screen bounds and moved downwards
        if (touchStartY !== null) {
            const touchCurrentY = event.touches[0].clientY;
    
            // Only update the delay if the finger swipes down (moves towards the bottom of the screen)
            if (touchCurrentY > touchStartY) {
                const touchDeltaY = touchCurrentY - touchStartY;
    
                const threshold = 50;
    
                // If the finger swipes down, maintain the delay at 200
                if (touchDeltaY > threshold) {
                    setDelayWhileDownArrowPressed();
                }
            }
        }
    }
});

touchArea.addEventListener('touchend', () => {

    if(!pause) {
        resetDelayAfterRelease(); // Reset delay when touch is released
        touchStartY = null; // Reset touchStartY
    }
});


// CONFIRM TETRONIMOS

function confirmPiece() {

    for(let i = 0; i < 20; i++) {
        
        for(let j = 0; j < 10; j++) {

            if(matrix[i][j] > 0) {
                
                matrix[i][j] = -matrix[i][j];
            }     
        }
    }

    return;
}

// CHECK COMPLETED ROWS

function completedRows() {

    let canceled = false;
    let canceledNum = 0;

    for (let i = matrix.length - 1; i >= 0; i--) {
        const row = matrix[i];
        const isCompleted = row.every(element => element < 0);

        if (isCompleted) {
            matrix.splice(i, 1);
            canceledNum++;
            canceled = true;

            let n = (i * 10) + 1;

            for(let j = 0; j < 10; j++) {

                let gridItem = document.querySelector(`.grid-item[data-number="${n}"]`);

                gridItem.classList.remove('red')
                gridItem.classList.remove('light-blue')
                gridItem.classList.remove('blue')
                gridItem.classList.remove('purple')
                gridItem.classList.remove('yellow')
                gridItem.classList.remove('green')
                gridItem.classList.remove('orange')
                
                gridItem.classList.add('white')

                n++;
            }
        }
    }

    for (let i = 0; i < canceledNum; i++) {
        matrix.unshift(Array(matrix[0].length).fill(0));

        lines++;
    }

    const pointsAlert = document.querySelector('.points');

    switch (canceledNum) {

        case 1:
            score += 40 * (level)
            pointsAlert.innerHTML = '<span>SINGLE</span> +' + (40 * (level))

            break;

        case 2:
            score += 100 * (level)	
            pointsAlert.innerHTML = '<span>DOUBLE</span> +' + (100 * (level))

            break;

        case 3:
            score += 300 * (level)	
            pointsAlert.innerHTML = '<span>TRIPLE</span> +' + (300 * (level))

            break;

        case 4:
            score += 1200 * (level)	
            pointsAlert.innerHTML = '<span>MULTIPLE</span> +' + (1200 * (level))

            break;
    }

    linesText.innerHTML = lines;

    if(canceled) {

        pointsAlert.style.bottom = '-40px';
        
        return true;
    }
}

// CHECK SCOREBOARD

let scoreboard;

function checkScoreboard() {

    scoreboard = JSON.parse(localStorage.getItem('myScoreboard'));

    if(scoreboard === null) {

        scoreboard = [5000, 4000, 3000, 2000, 1000];

        localStorage.setItem('myScoreboard', JSON.stringify(scoreboard));
    }

    for(let i = 0; i < 5; i++) {

        if(score > scoreboard[i]) {

            scoreboard.splice(i, 0, score);
            scoreboard.pop();
            break;
        }
    }

    localStorage.setItem('myScoreboard', JSON.stringify(scoreboard));
}

// UPDATE SCOREBOARD

function updateScoreboard() {

    let num = 1;

    for(let i = 0; i < 5; i++) {

        const selectedDiv = document.querySelector(`.scoreboard div[data-number="${num}"]`);

        selectedDiv.innerHTML = scoreboard[i].toLocaleString('en-US', { useGrouping: true });

        if(scoreboard[i] === score) {

            selectedDiv.style.backgroundColor = '#5f5f5f';
        }
        
        num++;
    }
}

// GAME

let pause = false;

// In home?
let gameStarted = false;

// After resume?
let gameRestarted = false;

let score = 0;
let lines = 0;
let level = 1;

let scoreText = document.getElementById('score-text');
let scoreTextMin = document.getElementById('score-text-min');
let linesText = document.getElementById('lines-text');
let levelText = document.getElementById('level-text');

scoreText.innerHTML = score.toLocaleString('en-US', { useGrouping: true });
scoreTextMin.innerHTML = score.toLocaleString('en-US', { useGrouping: true });
linesText.innerHTML = lines;
levelText.innerHTML = level;

function game() {
    
    // Reset delay for spawned tetronimos
    delay = resetDelay;

    // New level
    if(lines >= 10 * level && level !== 10) {

        level++;
        delay = delay - 50;
    }

    resetDelay = delay;

    levelText.innerHTML = level;

    // Picks the piece
    let dim = pickTetrominos();

    // Start position of piece
    tetrominosPosition = { row: 0, col: 3 };

    // State of rotation
    rotationState = 1;

    // Checks if can spawn
    let canSpawn = checkSpawn(dim);

    if(canSpawn) {

        updateGrid();

        // Move down
        let canMoveDown = true;
        
        function executeIteration() {

            if(gameRestarted) {
                gameRestarted = false;
                return;
            }
            
            if (canMoveDown) {

                if(!pause) {
                    canMoveDown = moveDown();
                }
                
                // Restart the loop by recursively calling executeIteration
                setTimeout(executeIteration, delay + 10);

            } else {

                if(completedRows()) {

                    setTimeout(() => {
                        updateGrid();

                        scoreText.innerHTML = score.toLocaleString('en-US', { useGrouping: true });
                        scoreTextMin.innerHTML = score.toLocaleString('en-US', { useGrouping: true });

                        const pointsAlert = document.querySelector('.points');
                        pointsAlert.style.bottom = '30px';

                        game();
                    }, 1250);

                } else {

                    return game();

                }

            }
        }
        executeIteration();

    } else {

        confirmPiece();

        checkScoreboard();

        updateScoreboard();

        const gameOverContainer = document.querySelector('.game-over-container');
        const gameOverModal = document.querySelector('.game-over-modal');
        
        gameOverModal.classList.remove('slide-out-down');
        gameOverModal.classList.add('slide-in-up');
        gameOverContainer.style.display = 'flex';

        return;
    }
}

// PAUSE

let pauseBtn = document.querySelector('.pause');

pauseBtn.addEventListener('click', () => {

    pause = true;

    const pauseContainer = document.querySelector('.pause-container');
    const pauseModal = document.querySelector('.pause-modal');
    
    pauseModal.classList.remove('slide-out-down');
    pauseModal.classList.add('slide-in-up');
    pauseContainer.style.display = 'flex';
});

let resumeBtn = document.querySelector('.resume');

resumeBtn.addEventListener('click', () => {

    pause = false;

    const pauseContainer = document.querySelector('.pause-container');
    const pauseModal = document.querySelector('.pause-modal');
    
    pauseModal.classList.remove('slide-in-up');
    pauseModal.classList.add('slide-out-down');

    setTimeout(() => {
        pauseContainer.style.display = 'none';
    }, 500);
});


document.addEventListener('visibilitychange', () => {
    if (document.hidden && gameStarted === true) {
        pause = true;

        const pauseContainer = document.querySelector('.pause-container');
        const pauseModal = document.querySelector('.pause-modal');
        
        pauseModal.classList.remove('slide-out-down');
        pauseModal.classList.add('slide-in-up');
        pauseContainer.style.display = 'flex';
    } 
});

// RESET GAME

function initializeGame(isRestart = false) {

    // Reset game state variables to their initial values
    score = 0;
    lines = 0;
    level = 1;
    delay = 600;

    // Reset recentNumbers
    recentNumbers = [];

    // Clear the grid
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => item.classList.remove('red', 'light-blue', 'blue', 'purple', 'yellow', 'green', 'orange', 'white'));

    // Reinitialize the matrix and update the grid
    matrix = createMatrix();
    updateGrid();

    // Update the HTML labels
    scoreText.innerHTML = score.toLocaleString('en-US', { useGrouping: true });
    scoreTextMin.innerHTML = score.toLocaleString('en-US', { useGrouping: true });
    linesText.innerHTML = lines;
    levelText.innerHTML = level;

    pause = false;

    const pauseContainer = document.querySelector('.pause-container');
    const pauseModal = document.querySelector('.pause-modal');
    
    pauseModal.classList.remove('slide-in-up');
    pauseModal.classList.add('slide-out-down');

    setTimeout(() => {
        pauseContainer.style.display = 'none';
    }, 500);

    const gameOverContainer = document.querySelector('.game-over-container');
    const gameOverModal = document.querySelector('.game-over-modal');
    
    gameOverModal.classList.remove('slide-in-up');
    gameOverModal.classList.add('slide-out-down');

    setTimeout(() => {
        gameOverContainer.style.display = 'none';
    }, 500);
    
    // Start a new game if it's not a restart
    if (!isRestart) {
        gameRestarted = true;
    } else {
        gameRestarted = false;
    }

    game();
}

const resetBtn = document.querySelector('.restart');
resetBtn.addEventListener('click', () => initializeGame());

const restartBtn = document.querySelector('.restart-game');
restartBtn.addEventListener('click', () => initializeGame(true));

// START GAME

const playBtn = document.querySelector('.play');
playBtn.addEventListener('click', () => {

    gameStarted = true;

    const homeContainer = document.querySelector('.home-page');
    const homeContainerInner = document.querySelector('.home-container');

    homeContainer.style.transition = '0.7s';
    homeContainer.style.bottom = '100%';

    homeContainerInner.style.transition = '0.7s';
    homeContainerInner.style.bottom = '100%';

    setTimeout(() => {

        game();

    }, 250);
});