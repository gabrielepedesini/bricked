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

                    case 0:
                        gridItem.classList.remove('red')
                        gridItem.classList.add('light-blue')
                        gridItem.classList.add('blue')
                        gridItem.classList.add('purple')
                        gridItem.classList.add('yellow')
                        gridItem.classList.add('green')
                        gridItem.classList.add('orange')
                        break;

                    case 1:
                        gridItem.classList.add('red')
                        break;

                    case 2:
                        gridItem.classList.add('light-blue')
                        break;

                    case 3:
                        gridItem.classList.add('blue')
                        break;

                    case 4:
                        gridItem.classList.add('purple')
                        break;

                    case 5:
                        gridItem.classList.add('yellow')
                        break;

                    case 6:
                        gridItem.classList.add('green')
                        break;

                    case 7:
                        gridItem.classList.add('orange')
                        break;

                    default:
                        break;
                  }
            }

            if(matrix[i][j] === 0) {
                gridItem.classList.remove('red')
                gridItem.classList.remove('light-blue')
                gridItem.classList.remove('blue')
                gridItem.classList.remove('purple')
                gridItem.classList.remove('yellow')
                gridItem.classList.remove('green')
                gridItem.classList.remove('orange')
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

function pickTetrominos() {

    let num = randomNumber();

    let dim;
    
    switch (num) {
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

// CHECK IF CAN SPAWN

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
const touchArea = document.querySelector('.container'); // Replace with your touch area element
let touchStartX = null; // Initialize to null to track the first touch

touchArea.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
    event.preventDefault(); // Prevent scrolling on touch devices
});

touchArea.addEventListener('touchmove', (event) => {
    event.preventDefault(); // Prevent scrolling on touch devices

    if (touchStartX !== null) {
        const touchCurrentX = event.touches[0].clientX;
        const touchDeltaX = touchCurrentX - touchStartX;

        const threshold = 40;

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
});

touchArea.addEventListener('touchend', () => {
    arrowLeftPressed = false;
    arrowRightPressed = false;
    clearInterval(repeatInterval);
    touchStartX = null; // Reset touchStartX
});

document.addEventListener('keydown', (event) => {
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
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'a') {
        arrowLeftPressed = false;
        if (arrowRightPressed) {
            startRepeat(moveRight);
        } else {
            clearInterval(repeatInterval);
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

// MOVE DOWN TETRONIMOS

let delay = 500;

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

    setTimeout(() => {
        updateGrid();
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
        delay = 100;
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
        setDelayWhileDownArrowPressed();
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowDown') {

        setTimeout(() => {
            resetDelayAfterRelease();
        }, resetDelay/2);
    }
});

// Add touch event listeners for swipe down and touch release
let touchStartY = null; // Initialize to null to track the first touch

touchArea.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY;
    setDelayWhileDownArrowPressed(); // Set delay when touch starts
    event.preventDefault(); // Prevent scrolling on touch devices
});

touchArea.addEventListener('touchmove', (event) => {
    event.preventDefault(); // Prevent scrolling on touch devices

    // Check if touch is still within the screen bounds
    if (touchStartY !== null) {
        const touchCurrentY = event.touches[0].clientY;
        const touchDeltaY = touchCurrentY - touchStartY;

        const threshold = 40;

        // If the finger swipes down, maintain the delay at 200
        if (touchDeltaY > threshold) {
            setDelayWhileDownArrowPressed();
        }
    }
});

touchArea.addEventListener('touchend', () => {
    resetDelayAfterRelease(); // Reset delay when touch is released
    touchStartY = null; // Reset touchStartY
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

// GAME

function game() {

    // Reset delay for spawned tetronimos
    delay = resetDelay;

    // Picks the piece
    let dim = pickTetrominos();

    // Checks if can spawn
    let canSpawn = checkSpawn(dim);

    if(canSpawn) {

        updateGrid();

        // Move down
        let canMoveDown = true;
        
        function executeIteration() {
            
            if (canMoveDown) {

                canMoveDown = moveDown();
                
                // Restart the loop by recursively calling executeIteration
                setTimeout(executeIteration, delay + 50);

            } else {

                return game();

            }
        }
        executeIteration();

    } else {

        confirmPiece();

        console.log('GAME OVER')

    }
}

game();




























































// CHECK BUTTONS CLICKED

// let arrowLeftPressed = false;
// let arrowRightPressed = false;

// document.addEventListener('keydown', (event) => {
//     if ((event.key === 'ArrowLeft' || event.key === 'a') && !arrowLeftPressed) {
        
//         arrowLeftPressed = true;
//         moveLeft();

//         // Repeat the function call as needed
//         const repeatInterval = 80; // in milliseconds
//         const repeatFunction = setInterval(() => {
//             if (arrowLeftPressed) {
//                 moveLeft();  // Call your function again
//             } else {
//                 clearInterval(repeatFunction);
//             }
//         }, repeatInterval);
//     }
// });

// document.addEventListener('keydown', (event) => {
//     if ((event.key === 'ArrowRight' || event.key === 'd') && !arrowRightPressed) {

//         arrowRightPressed = true;
//         moveRight();  // Call your function here
        
//         // Repeat the function call as needed
//         const repeatInterval = 80; // in milliseconds
//         const repeatFunction = setInterval(() => {
//             if (arrowRightPressed) {
//                 moveRight();  // Call your function again
//             } else {
//                 clearInterval(repeatFunction);
//             }
//         }, repeatInterval);
//     }
// });

// document.addEventListener('keyup', (event) => {
//     if ((event.key === 'ArrowLeft' || event.key === 'a')) {
//         arrowLeftPressed = false;
//     }
// });

// document.addEventListener('keyup', (event) => {
//     if (event.key === 'ArrowRight' || event.key === 'd') {
//         arrowRightPressed = false;
//     }
// });