function bellmanFord(vertices, edges, start) {
    // dist - хранит кратчайшие расстояния
    // prev - хранит предыдущую вершину
    const dist = {};
    const prev = {};

    for (const v of vertices) {
        dist[v] = Infinity;
        prev[v] = null;
    }
    dist[start] = 0;

    const V = vertices.length; 

    // пытаемся улучшить расстояния через все ребра
    for (let i = 0; i < V - 1; i++) {
        for (const { from, to, weight } of edges) {
            // если нашли путь короче через ребро
            if (dist[from] !== Infinity && dist[from] + weight < dist[to]) {
                dist[to] = dist[from] + weight;
                prev[to] = from;
            }
        }
    }

    // проверка на отрицательный цикл
    for (const { from, to, weight } of edges) {
        if (dist[from] !== Infinity && dist[from] + weight < dist[to]) {
            return { dist: null, prev: null, hasNegativeCycle: true };
        }
    }

    // отрицательных циклов нет
    return { dist, prev, hasNegativeCycle: false };
}

// восстанавливает путь от начала до конца
function getPath(prev, start, end) {
    // если prev равен null, пути не существует
    if (prev === null) return null;
    
    const path = [];
    let current = end;
    
    // идем от конечной вершины к начальной через предков
    while (current !== null) {
        path.unshift(current);  // добавляем вершину в начало массива
        current = prev[current]; // переходим к предыдущей вершине
    }
    
    // если начальная вершина не совпадает - пути не существует
    return path[0] === start ? path : null;
}

const vertices = ["S", "A", "B", "C", "F"];

const edges = [
    { from: "S", to: "A", weight: 4 },
    { from: "S", to: "B", weight: 3 },
    { from: "A", to: "B", weight: -2 },
    { from: "B", to: "A", weight: 1 },
    { from: "B", to: "C", weight: 2 },
    { from: "C", to: "F", weight: 1 },
    { from: "A", to: "F", weight: 5 },
];

const result = bellmanFord(vertices, edges, "S");

if (result.hasNegativeCycle) {
    console.log("Граф содержит отрицательный цикл");
} else {
    const path = getPath(result.prev, "S", "F");
    console.log("Длина:", result.dist["F"]);
    console.log("Путь:", path.join("=>"));
}