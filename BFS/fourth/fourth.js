function wordLadder(A, B, wordList) {
  const wordSet = new Set(wordList);

  // Если конечного слова нет в списке
  if (!wordSet.has(B)) return -1;

  // текущее слово, количество шагов
  const queue = [[A, 0]];
  const visited = new Set([A]);

  while (queue.length > 0) {
    const [word, steps] = queue.shift();

    // пробуем заменить каждую букву
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        const newChar = String.fromCharCode(c);
        if (newChar === word[i]) continue;        // пропускаем если повтор буквы

        // новое слово с заменённой буквой
        const newWord = word.slice(0, i) + newChar + word.slice(i + 1);

        if (newWord === B) return steps + 1;      // нашли слово

        if (wordSet.has(newWord) && !visited.has(newWord)) {
          visited.add(newWord);
          queue.push([newWord, steps + 1]);
        }
      }
    }
  }

  return -1; // путь не найден
}

const A = "hit";
const B = "cog";
const words = ["hot", "dot", "dog", "lot", "log", "cog"];

console.log(wordLadder(A, B, words)); // 4