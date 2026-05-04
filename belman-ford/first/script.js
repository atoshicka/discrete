function bellmanFord(vertices, edges, start) {
    const dist = {};
    const prev = {};

    for (const v of vertices) {
        dist[v] = Infinity;
        prev[v] = null;
    }
    dist[start] = 0;

    const V = vertices.length;

    // на каждой итерации пытаемся улучшить расстояния через все рёбра
    for (let i = 0; i < V - 1; i++) {
        for (const { from, to, weight } of edges) {
            // если нашли путь короче через ребро from->to
            if (dist[from] !== Infinity && dist[from] + weight < dist[to]) {
                dist[to] = dist[from] + weight;  // обновляем расстояние
                prev[to] = from;                  // запоминаем, откуда пришли
            }
        }
    }

    // проверка на отрицательный цикл
    let hasNegativeCycle = false;
    for (const { from, to, weight } of edges) {
        if (dist[from] !== Infinity && dist[from] + weight < dist[to]) {
            hasNegativeCycle = true;  // нашли отрицательный цикл
            break;
        }
    }
    return { dist, prev, hasNegativeCycle };
}

// функция для восстановления пути
function getPath(prev, start, end) {
    const path = [];
    let current = end;
    
    // идем от конечной вершины к начальной через предков
    while (current !== null) {
        path.unshift(current);      // добавляем вершину в начало массива
        current = prev[current];    // переходим к предыдущей вершине
    }
    
    // если начальная вершина не совпадает - пути не существует
    if (path[0] !== start) return null;
    return path;
}

const vertices1 = ["A", "B", "C", "D", "E"];

const edges1 = [
    { from: "A", to: "B", weight: 4 },
    { from: "A", to: "C", weight: 2 },
    { from: "B", to: "C", weight: -1 },
    { from: "B", to: "D", weight: 5 },
    { from: "C", to: "D", weight: 8 },
    { from: "C", to: "E", weight: 10 },
    { from: "D", to: "E", weight: 2 },
];

const result1 = bellmanFord(vertices1, edges1, "A");

for (const v of vertices1) {
    // если расстояние бесконечность
    const d = result1.dist[v] === Infinity ? "бесконечность" : result1.dist[v];
    // восстанавливаем путь
    const path = getPath(result1.prev, "A", v);
    const pathStr = path ? path.join("=>") : "недостижимо";
    console.log(`${v}: ${d}  (${pathStr})`);
}