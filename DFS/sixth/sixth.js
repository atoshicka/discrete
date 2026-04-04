const maze = [
  [0, 1, 0],
  [0, 1, 0],
  [0, 0, 0]
];
const start = [0, 0];
const end = [2, 2];

function solveMaze(maze, start, end) {
  const rows = maze.length;
  const cols = maze[0].length;

  // массив для отслеживания посещённых клеток
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  function dfs(r, c) {
    // вышли за границы
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
    // стена или уже были здесь
    if (maze[r][c] === 1 || visited[r][c]) return false;
    // конец
    if (r === end[0] && c === end[1]) return true;

    visited[r][c] = true; // отмечаем клетку как посещённую

    // все 4 направления: вниз, вверх, вправо, влево
    return dfs(r + 1, c) || dfs(r - 1, c) || dfs(r, c + 1) || dfs(r, c - 1);
  }

  return dfs(start[0], start[1]);
}

console.log(solveMaze(maze, start, end)); // true