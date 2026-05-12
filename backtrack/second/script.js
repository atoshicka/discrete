function pathExists(maze) {
    const rows = maze.length;
    const cols = maze[0].length;

    const visited = Array.from({ length: rows }, () =>
        Array(cols).fill(false)
    );

    function backtrack(x, y) {
        // проверка границ и препятствий
        if (
            x < 0 ||
            y < 0 ||
            x >= rows ||
            y >= cols ||
            maze[x][y] === 1 ||
            visited[x][y]
        ) {
            return false;
        }

        // конец
        if (x === rows - 1 && y === cols - 1) {
            return true;
        }

        visited[x][y] = true;

        // вниз, вверх, вправо, влево
        const found =
            backtrack(x + 1, y) ||
            backtrack(x - 1, y) ||
            backtrack(x, y + 1) ||
            backtrack(x, y - 1);

        // Откат
        visited[x][y] = false;

        return found;
    }

    return backtrack(0, 0);
}

const maze = [
    [0, 0, 0],
    [1, 1, 0],
    [0, 0, 0]
];

console.log("Существует путь:", pathExists(maze) ? "Да" : "Нет");