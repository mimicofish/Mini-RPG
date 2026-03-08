
const container = document.querySelector('#grid');
const cols = 10;
const row = 10;

const map = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,1,0,0,0],
    [0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
];


let playerPosition = 0;
renderGrid();

function renderGrid() {
    container.innerHTML = '';

    for (let y = 0; y < row; y++) {
        for (let x = 0; x < cols; x++) {
        
            const cell = document.createElement('div');
            cell.classList.add('grid-item');
        
            if (map[y][x] === 0) {
                cell.classList.add('wall');
            }

            const index = y * cols + x;

            if (index === playerPosition) {
                cell.classList.add('player');
            }

            container.appendChild(cell);

        }
    }
}

document.addEventListener('keydown', function(event){
    console.log(event.key);
    const x = playerPosition % cols;
    const y = Math.floor(playerPosition / cols);
    
    if (event.key === 'ArrowRight') {
        if (x < cols - 1 && map[y][x + 1] === 0) {
            playerPosition += 1;
        }
    }
    if (event.key === 'ArrowLeft') {
        if (x > 0 && map[y][x - 1] === 0) {
            playerPosition -= 1;
        }
    }
    if (event.key === 'ArrowDown') {
        if (y < row - 1 && map[y + 1][x] === 0) {
            playerPosition += cols;
        }
    }
    if (event.key === 'ArrowUp') {
        if (y > 0 && map[y - 1][x] === 0) {
            playerPosition -= cols;
        }
    }

    renderGrid();
});





