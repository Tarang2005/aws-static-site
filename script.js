const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");
const rows = 20;
const cols = 20;
const cellSize = canvas.width / cols;
let grid = Array.from({ length: rows }, () => Array(cols).fill(0));
let start = { x: 0, y: 0 };
let end = { x: cols - 1, y: rows - 1 };

canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / cellSize);
    const y = Math.floor((event.clientY - rect.top) / cellSize);
    if ((x === start.x && y === start.y) || (x === end.x && y === end.y)) return;
    grid[y][x] = grid[y][x] === 1 ? 0 : 1;
    drawGrid();
});

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            ctx.fillStyle = grid[y][x] === 1 ? "#ff5733" : "#334155";
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            ctx.strokeStyle = "#ffffff";
            ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
    ctx.fillStyle = "#32cd32";
    ctx.fillRect(start.x * cellSize, start.y * cellSize, cellSize, cellSize);
    ctx.fillStyle = "#dc143c";
    ctx.fillRect(end.x * cellSize, end.y * cellSize, cellSize, cellSize);
}

function findShortestPath() {
    const queue = [{ x: start.x, y: start.y, path: [] }];
    const visited = new Set();
    
    while (queue.length) {
        const { x, y, path } = queue.shift();
        if (x === end.x && y === end.y) {
            drawPath(path);
            return;
        }
        const directions = [
            { dx: 0, dy: -1 }, { dx: 0, dy: 1 }, 
            { dx: -1, dy: 0 }, { dx: 1, dy: 0 }
        ];
        directions.forEach(({ dx, dy }) => {
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && grid[ny][nx] === 0) {
                const key = `${nx},${ny}`;
                if (!visited.has(key)) {
                    visited.add(key);
                    queue.push({ x: nx, y: ny, path: [...path, { x: nx, y: ny }] });
                }
            }
        });
    }
    alert("No path found");
}

function drawPath(path) {
    ctx.fillStyle = "#00bfff";
    path.forEach(({ x, y }, index) => {
        setTimeout(() => {
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }, index * 50);
    });
}

function resetGrid() {
    grid = Array.from({ length: rows }, () => Array(cols).fill(0));
    drawGrid();
}

drawGrid();
