function wordSearch(grid, word) {
  const rows = grid.length;
  const cols = grid[0].length;

  function dfs(r, c, index) {
    // Все буквы слова совпали
    if (index === word.length) return true;

    // вышли за границы/стена или буква не совпадает
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
    if (grid[r][c] !== word[index]) return false;

    // Временно помечаем клетку как посещённую
    const temp = grid[r][c];
    grid[r][c] = '#';

    // 4 направления
    const found = dfs(r+1, c, index+1)
            || dfs(r-1, c, index+1)
            || dfs(r, c+1, index+1)
            || dfs(r, c-1, index+1);

    // Возвращаем букву обратно
    grid[r][c] = temp;

    return found;
  }

  // поиск с каждой клетки сетки
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }

  return false;
}

const grid = [
  ['A', 'B', 'C', 'E'],
  ['S', 'F', 'C', 'S'],
  ['A', 'D', 'E', 'E']
];
const word = 'ABCCED';

console.log(wordSearch(grid, word));  // true
console.log(wordSearch(grid, 'SEE')); // true
console.log(wordSearch(grid, 'ABCB')); // false