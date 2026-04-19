function shortestBridge(matrix) {
    const n = matrix.length;
    const m = matrix[0].length;
    const visited = Array(n).fill(null).map(() => Array(m).fill(false));
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const queue = [];
    
    // поиск первого острова
    function dfs(i, j) {
        if (i < 0 || i >= n || j < 0 || j >= m || 
            visited[i][j] || matrix[i][j] === 0) {
            return;
        }
        
        visited[i][j] = true;
        queue.push([i, j, 0]); // добавляем все клетки первого острова
        
        for (const [di, dj] of directions) {
            dfs(i + di, j + dj);
        }
    }
    
    // находим первый остров
    let found = false;
    for (let i = 0; i < n && !found; i++) {
        for (let j = 0; j < m && !found; j++) {
            if (matrix[i][j] === 1) {
                dfs(i, j);
                found = true;
            }
        }
    }
    
    // поиск кратчайшего пути ко второму острову
    while (queue.length > 0) {
        const [x, y, dist] = queue.shift();
        
        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;
            
            if (nx >= 0 && nx < n && ny >= 0 && ny < m && !visited[nx][ny]) {
                if (matrix[nx][ny] === 1) {
                    return dist; // нашли второй остров
                }
                visited[nx][ny] = true;
                queue.push([nx, ny, dist + 1]);
            }
        }
    }
    
    return -1;
}

const matrix2 = [
    [1, 1, 0, 0],
    [1, 0, 0, 0],
    [0, 0, 1, 1],
    [0, 0, 1, 1]
];
console.log("Длина минимального моста:", shortestBridge(matrix2)); // 2