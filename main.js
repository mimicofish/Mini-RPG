
const container = document.querySelector('#grid');

const cols = 10;
const row = 10;
let playerPosition;

let lives = 3;

// 0 = empty
// 1 = wall
// 2 = player start
// 3 = enemy
const map = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,2,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,1,0,0,0],
    [0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,3,0],
    [0,0,0,0,0,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
];

const initialMap = JSON.parse(JSON.stringify(map)); // Deep copy of the map


findPlayerStart();
renderGrid();

function renderGrid() {
    container.innerHTML = '';

    for (let y = 0; y < row; y++) {
        for (let x = 0; x < cols; x++) {
        
            const cell = document.createElement('div');
            cell.classList.add('grid-item');
        
            if (map[y][x] === 1) {
                cell.classList.add('wall');
            }

            if (map[y][x] === 3) {
                cell.classList.add('enemy');
            }

            //convert 2D position to 1D index
            const index = y * cols + x;

            if (index === playerPosition) {
                cell.classList.add('player');
            }

            container.appendChild(cell);

        }
    }
}

function findPlayerStart() {
    for (let y = 0; y < row; y++) {
        for (let x = 0; x < cols; x++) {
            if (map[y][x] === 2) {
                playerPosition = y * cols + x;
            }
        }
    }
}

function handleHit(){
    lives--;

    if (lives <= 0) {
        alert('Game Over!');

        // Reset game
        for (let y = 0; y < row; y++) {
            for (let x = 0; x < cols; x++) {
                map[y][x] = initialMap[y][x]; // Reset map to initial state
            }   
        }

        lives = 3; // Reset lives
    } else {
        alert(`You got hit! Lives left: ${lives} ❤️`);
    }

    findPlayerStart(); 
    renderGrid();
}

document.addEventListener('keydown', function(event){
    
    //Pick player position 
    const x = playerPosition % cols;
    const y = Math.floor(playerPosition / cols);


    if (event.key === 'ArrowRight') {
        const nextX = x + 1;
        const nextY = y;

        //Cegah keluar batas grid
        if (nextX >= cols) {
            return;
        }
        
        //check collision with enemy
        if (map[nextY][nextX] === 3) {
            handleHit();
            return;
        }

        //checking if can walk to next cell (not wall)
        if (
            map[nextY][nextX] === 0 || map[nextY][nextX] === 2
        ) {
            playerPosition += 1;
        }
    }
    if (event.key === 'ArrowLeft') {
        const nextX = x - 1;
        const nextY = y;

        if (nextX < 0) {
            return;
        }

        if (map[nextY][nextX] === 3) {
            handleHit();
            return;
        }

        if (
            map[nextY][nextX] === 0 || map[nextY][nextX] === 2
        ) {
            playerPosition -= 1;
        }
    }
    if (event.key === 'ArrowDown') {
        const nextX = x;
        const nextY = y + 1;

        if (nextY >= row) {
            return;
        }
        
        if (map[nextY][nextX] === 3) {
            handleHit();
            return;
        }

        if (
            map[nextY][nextX] === 0 || map[nextY][nextX] === 2
        ) {
            playerPosition += cols;
        }
    }
    if (event.key === 'ArrowUp') {
        const nextX = x;
        const nextY = y - 1;

        if (nextY < 0) {
            return;
        }

        if (map[nextY][nextX] === 3) {
            handleHit();
            return;
        }

        if (
            map[nextY][nextX] === 0 || map[nextY][nextX] === 2
        ) {
            playerPosition -= cols;
        }
    }

    renderGrid();
});


setInterval(moveEnemy, 150);

function moveEnemy() {

    //cari posisi musuh
    let enemyPosition;

    for (let y = 0; y < row; y++) {
        for (let x = 0; x < cols; x++) {
            if (map[y][x] === 3) {
                enemyPosition = y * cols + x;
            }
        }
    }

    const x = enemyPosition % cols;
    const y = Math.floor(enemyPosition / cols);


    const playerX = playerPosition % cols;
    const playerY = Math.floor(playerPosition / cols);

    let dx = 0;
    let dy = 0;

    if (playerX > x) dx = 1;
    else if (playerX < x) dx = -1;

    if (playerY > y) dy = 1;
    else if (playerY < y) dy = -1;

    // Randomly decide to move vertically or horizontally
    if (Math.abs(playerX - x) > Math.abs(playerY - y)) {
        dy = 0; // Move vertically
    } else {
        dx = 0; // Move horizontally
    }
    
    const newX = x + dx;
    const newY = y + dy;

    if (
        newX >= 0 && newX < cols && 
        newY >= 0 && newY < row 
    ) {
        const newIndex = newY * cols + newX;
        if (newIndex === playerPosition) {
            handleHit();
            return;
        }

        if (map[newY][newX] === 0) {
            // Update map
            map[y][x] = 0; // Clear old position
            map[newY][newX] = 3; // Move enemy to new position
        }
    }

    renderGrid();
}
