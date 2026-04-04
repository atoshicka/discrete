function knightMoves(x1, y1, x2, y2) {
  // Если уже на месте
  if (x1 === x2 && y1 === y2) return 0;

  // Все 8 возможных ходов коня
  const moves = [
    [2,1],[2,-1],[-2,1],[-2,-1],
    [1,2],[1,-2],[-1,2],[-1,-2]
  ];

  const visited = Array.from({ length: 8 }, () => Array(8).fill(false));
  visited[x1][y1] = true;

  // строка, столбец, количество ходов
  const queue = [[x1, y1, 0]];

  while (queue.length > 0) {
    const [x, y, steps] = queue.shift();

    for (const [dx, dy] of moves) {
      const nx = x + dx;
      const ny = y + dy;

      // Проверяем границы доски
      if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8 && !visited[nx][ny]) {
        if (nx === x2 && ny === y2) return steps + 1;
        visited[nx][ny] = true;
        queue.push([nx, ny, steps + 1]);
      }
    }
  }

  return -1;
}

console.log(knightMoves(0, 0, 7, 7)); // 6
console.log(knightMoves(0, 0, 1, 1)); // 4
console.log(knightMoves(0, 0, 0, 0)); // 0