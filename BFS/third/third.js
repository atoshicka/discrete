function rottenOranges(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const queue = [];
  let freshCount = 0;

  // Находим все гнилые апельсины и считаем свежие
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) queue.push([r, c, 0]); // гнилой - в очередь
      if (grid[r][c] === 1) freshCount++;           // считаем свежие
    }
  }

  // Если свежих нет
  if (freshCount === 0) return 0;

  const directions = [[1,0], [-1,0], [0,1], [0,-1]];
  let timeElapsed = 0;

  while (queue.length > 0) {
    const [r, c, time] = queue.shift();

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      // Заражаем соседний свежий апельсин
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
        grid[nr][nc] = 2;        // он стал гнилым
        freshCount--;             // уменьшаем счётчик свежих
        timeElapsed = time + 1;  // обновляем время
        queue.push([nr, nc, time + 1]);
      }
    }
  }

  // Если остались свежие - невозможно заразить всех
  return freshCount === 0 ? timeElapsed : -1;
}

const grid = [
  [2, 1, 1],
  [1, 1, 0],
  [0, 1, 1]
];

console.log(rottenOranges(grid)); // 4