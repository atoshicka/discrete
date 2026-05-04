function bellmanFord(vertices, edges, start) {
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

const vertices5 = ["A", "B", "C", "D"];

const edges5 = [
    { from: "A", to: "B", weight: 3 },
    { from: "A", to: "C", weight: 5 },
    { from: "B", to: "C", weight: -2 },
    { from: "B", to: "D", weight: 1 },
    { from: "C", to: "D", weight: 4 },
];

const result5 = bellmanFord(vertices5, edges5, "A");
const path5 = getPath(result5.prev, "A", "D");

if (result5.hasNegativeCycle) {
    console.log("Граф содержит отрицательный цикл — путь не определен");
} else {
    console.log("Длина:", result5.dist["D"]);
    console.log("Путь:", path5.join("=>"));
}