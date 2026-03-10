function primSimplified(graph, start) {
    const n = graph.length;
    const visited = Array(n).fill(false); //массив отслеживает посещенные вершины
    const mst = []; //хранение ребер мин ост дер
    let totalWeight = 0; //общий вес

    //стартовая вершина
    visited[start] = true;

    //находим мин-ые ребра, пока не подключены все вершины
    for(let edges = 0; edges < n - 1; edges++) {
        //инициализация минимального веса
        let minWeight = Infinity;
        let u = -1, v = -1;

        //ищем мин ребро, соединяющее посещенные и непосещенные вершины
        for(let i = 0; i < n; i++) {
            if (visited[i]) {
                for (let j = 0; j < n; j++) {
                    if (!visited[j] && graph[i][j] !== 0 && graph[i][j] < minWeight) {
                        minWeight = graph[i][j];
                        u = i;
                        v = j;
                    }
                }
            }
        }
        //добавляем ребро
        mst.push({ u, v, weight: minWeight });
        visited[v] = true;
        totalWeight += minWeight;
    }
    return { mst, totalWeight };
}

//0 - отсутствие ребра между вершинами
const graph = [
    [0, 10, 6, 5],
    [10, 0, 15, 0],
    [6, 15, 0, 4],
    [5, 0, 4, 0]
];

const result = primSimplified(graph, 0);

console.log('минимальное остовное дерево: ');
console.log(result.mst);
console.log('общий вес: ', result.totalWeight);