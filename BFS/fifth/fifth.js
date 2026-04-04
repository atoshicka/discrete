function nearestExit(maze, start) {
  const rows = maze.length;
  const cols = maze[0].length;

  // стартовая позиция
  const [sr, sc] = start;

  const queue = [[sr, sc, 0]];
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  visited[sr][sc] = true;

  const directions = [[1,0], [-1,0], [0,1], [0,-1]];

  while (queue.length > 0) {
    const [r, c, steps] = queue.shift();

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
          && maze[nr][nc] === 0 && !visited[nr][nc]) {

        // клетка на границе матрицы - это выход
        const isExit = (nr === 0 || nr === rows - 1 || nc === 0 || nc === cols - 1);
        if (isExit) return steps + 1;

        visited[nr][nc] = true;
        queue.push([nr, nc, steps + 1]);
      }
    }
  }

  return -1; // выхода нет
}

const maze = [
  [1, 0, 0, 1],
  [0, 0, 1, 0],
  [0, 0, 0, 0]
];
const start = [1, 1];

console.log(nearestExit(maze, start)); // 1