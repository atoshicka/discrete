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
                dist[to] = dist[from] + weight;
                prev[to] = from;
            }
        }
    }

    // проверка на отрицательный цикл
    // если после всех итераций расстояние всё ещё можно улучшить, значит в графе есть цикл с отрицательным весом
    let hasNegativeCycle = false;
    for (const { from, to, weight } of edges) {
        if (dist[from] !== Infinity && dist[from] + weight < dist[to]) {
            hasNegativeCycle = true;
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

// переводим матрицу смежности в список ребер
function matrixToEdges(matrix) {
    const edges = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] !== 0) {      // если ребро существует (вес не ноль)
                edges.push({ from: i, to: j, weight: matrix[i][j] });
            }
        }
    }
    return edges;
}

const matrix4 = [
    [0, 5, 0, 0],
    [0, 0, -3, 0],
    [0, 0, 0, 4],
    [2, 0, 0, 0],
];

const vertices4 = [0, 1, 2, 3];
const edges4 = matrixToEdges(matrix4);
const result4 = bellmanFord(vertices4, edges4, 0);

// результаты для каждой вершины
for (const v of vertices4) {
    // расстояние бесконечность
    const d = result4.dist[v] === Infinity ? "бесконечно" : result4.dist[v];
    // восстанавливаем путь
    const path = getPath(result4.prev, 0, v);
    const pathStr = path ? path.join("=>") : "недостижимо";
    console.log(`${v}: ${d}  (${pathStr})`);
}