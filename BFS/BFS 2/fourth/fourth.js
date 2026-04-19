function evacuation(matrix) {
    const n = matrix.length;
    const m = matrix[0].length;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    
    // находим выход
    let exitRow = -1, exitCol = -1;
    const startPoints = [];
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (matrix[i][j] === 'E') {
                exitRow = i;
                exitCol = j;
            } else if (matrix[i][j] === 'S') {
                startPoints.push([i, j]);
            }
        }
    }
    
    if (exitRow === -1) return -1;
    
    // BFS от выхода (обратный поиск)
    const distances = Array(n).fill(null).map(() => Array(m).fill(Infinity));
    const queue = [[exitRow, exitCol, 0]];
    distances[exitRow][exitCol] = 0;
    
    while (queue.length > 0) {
        const [x, y, dist] = queue.shift();
        
        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;
            
            if (nx >= 0 && nx < n && ny >= 0 && ny < m && 
                matrix[nx][ny] !== '1' && distances[nx][ny] === Infinity) {
                distances[nx][ny] = dist + 1;
                queue.push([nx, ny, dist + 1]);
            }
        }
    }
    
    // максимальное расстояние среди всех стартовых точек
    let maxDist = 0;
    for (const [x, y] of startPoints) {
        if (distances[x][y] === Infinity) {
            return -1; // невозможно добраться
        }
        maxDist = Math.max(maxDist, distances[x][y]);
    }
    
    return maxDist;
}

const building = [
    ["S", "0", "1", "E"],
    ["1", "0", "1", "0"],
    ["1", "0", "0", "S"]
];
console.log("Минимальное время эвакуации:", evacuation(building)); // 4