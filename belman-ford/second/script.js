function bellmanFord(vertices, edges, start) {
    // dist - кратчайшие расстояния
    // prev - предыдущая вершина
    const dist = {};
    const prev = {};
    for (const v of vertices) {
        dist[v] = Infinity;
        prev[v] = null;
    }
    dist[start] = 0;

    const V = vertices.length;

    // на каждой итерации пытаемся улучшить известные расстояния
    for (let i = 0; i < V - 1; i++) {
        // проходим по всем рёбрам графа
        for (const { from, to, weight } of edges) {
            // если нашли путь короче текущего
            if (dist[from] !== Infinity && dist[from] + weight < dist[to]) {
                dist[to] = dist[from] + weight;  // обновляем расстояние
                prev[to] = from;                  // запоминаем, откуда пришли
            }
        }
    }

    // проверка на существование отрицательного цикла
    // если после (v-1) расстояние все еще можно улучшить, значит в графе есть цикл с отрицательным весом
    let hasNegativeCycle = false;
    for (const { from, to, weight } of edges) {
        if (dist[from] !== Infinity && dist[from] + weight < dist[to]) {
            hasNegativeCycle = true;  // нашли отрицательный цикл
            break;
        }
    }
    return { dist, prev, hasNegativeCycle };
}

const vertices2 = ["A", "B", "C"];
const edges2 = [
    { from: "A", to: "B", weight: 1 },
    { from: "B", to: "C", weight: -1 },
    { from: "C", to: "A", weight: -1 },
];

const result2 = bellmanFord(vertices2, edges2, "A");

console.log("Обнаружен цикл отрицательного веса:", result2.hasNegativeCycle);