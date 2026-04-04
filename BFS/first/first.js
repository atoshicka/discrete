// кратчайший путь
function shortestPath(maze, start, end) {
  const rows = maze.length;
  const cols = maze[0].length;

  // строка, столбец, шаги
  const queue = [[start[0], start[1], 0]];
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  visited[start[0]][start[1]] = true;

  // 4 направления: вниз, вверх, вправо, влево
  const directions = [[1,0], [-1,0], [0,1], [0,-1]];

  while (queue.length > 0) {
    const [r, c, steps] = queue.shift();

    // Дошли до финиша
    if (r === end[0] && c === end[1]) return steps;

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      // Проверяем границы, стены и посещенные клетки
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
          && maze[nr][nc] === 0 && !visited[nr][nc]) {
        visited[nr][nc] = true;
        queue.push([nr, nc, steps + 1]);
      }
    }
  }

  return -1; // путь не найден
}

const maze = [
  [0, 0, 0],
  [1, 1, 0],
  [0, 0, 0]
];
const start = [0, 0];
const end = [2, 2];

console.log(shortestPath(maze, start, end)); // 4