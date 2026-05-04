function minRotations(start, target, forbidden) {
    if (start === target) return 0;
    
    const forbiddenSet = new Set(forbidden);
    const visited = new Set([start]);
    const queue = [[start, 0]];
    
    function getNextStates(code) {
        const states = [];
        const arr = code.split('');
        
        for (let i = 0; i < arr.length; i++) {
            const digit = parseInt(arr[i]);
            
            // Увеличение цифры
            const newArr1 = [...arr];
            newArr1[i] = ((digit + 1) % 10).toString();
            states.push(newArr1.join(''));
            
            // Уменьшение цифры
            const newArr2 = [...arr];
            newArr2[i] = ((digit - 1 + 10) % 10).toString();
            states.push(newArr2.join(''));
        }
        
        return states;
    }
    
    while (queue.length > 0) {
        const [current, steps] = queue.shift();
        
        const nextStates = getNextStates(current);
        
        for (const next of nextStates) {
            if (next === target) {
                return steps + 1;
            }
            
            if (!visited.has(next) && !forbiddenSet.has(next)) {
                visited.add(next);
                queue.push([next, steps + 1]);
            }
        }
    }
    
    return -1; // Невозможно достичь
}

console.log("Минимальное количество поворотов:", 
    minRotations("0000", "0202", ["0001", "0101"])); // 6