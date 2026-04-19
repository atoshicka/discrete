function countIslands(matrix) {
    if (!matrix || matrix.length === 0) return 0;
    
    const n = matrix.length;
    const m = matrix[0].length;
    const visited = Array(n).fill(null).map(() => Array(m).fill(false));
    let count = 0;
    
    function dfs(i, j) {
        // Проверка границ и условий
        if (i < 0 || i >= n || j < 0 || j >= m || 
            visited[i][j] || matrix[i][j] === 0) {
            return;
        }
        
        visited[i][j] = true;
        
        // Обход по 4 направлениям
        dfs(i + 1, j);
        dfs(i - 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    }
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (matrix[i][j] === 1 && !visited[i][j]) {
                dfs(i, j);
                count++;
            }
        }
    }
    
    return count;
}

// Пример использования
const matrix1 = [
    [1, 1, 0, 0],
    [1, 0, 0, 0],
    [0, 0, 1, 1],
    [0, 0, 1, 1]
];
console.log("Количество островов:", countIslands(matrix1)); // 2