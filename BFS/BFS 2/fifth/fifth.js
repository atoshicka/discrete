function minOperations(n) {
    if (n === 1) return 0;
    
    const visited = new Set([1]);
    const queue = [[1, 0]]; // текущее число, количество операций
    
    while (queue.length > 0) {
        const [current, ops] = queue.shift();
        
        // три возможные операции
        const nextStates = [
            current * 2,
            current * 3,
            current + 1
        ];
        
        for (const next of nextStates) {
            if (next === n) {
                return ops + 1;
            }
            
            // не идем дальше n * 2
            if (next <= n * 2 && !visited.has(next)) {
                visited.add(next);
                queue.push([next, ops + 1]);
            }
        }
    }
    
    return -1;
}

console.log(minOperations(10)); // 3
console.log("Путь: 1 → 3 (×3) → 9 (×3) → 10 (+1)");
