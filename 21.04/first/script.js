function dijkstra(graph, start) {
  const dist = {};
  const prev = {};
  const visited = new Set();  // множество посещенных вершин

  for (const node in graph) {
    dist[node] = Infinity;
    prev[node] = null;
  }
  dist[start] = 0;

  while (true) {
    // находим непосещенную вершину с минимальным расстоянием
    let u = null;
    for (const node in dist) {
      if (!visited.has(node) && (u === null || dist[node] < dist[u])) {
        u = node;
      }
    }

    if (u === null || dist[u] === Infinity) break;
    
    // помечаем вершину как посещенную
    visited.add(u);
    // перебираем всех соседей вершины u
    for (const [neighbor, weight] of Object.entries(graph[u])) {
      const newDist = dist[u] + weight;  // новое расстояние
      if (newDist < dist[neighbor]) {
        dist[neighbor] = newDist;  // обновляем расстояние
        prev[neighbor] = u;        // запоминаем, откуда пришли
      }
    }
  }

  return { dist, prev };
}

// функция для восстановления пути
function getPath(prev, start, end) {
  const path = [];
  let current = end;

  // идем от конечной вершины к начальной через предков
  while (current !== null) {
    path.unshift(current);    // добавляем вершину в начало массива
    current = prev[current];  // переходим к предыдущей вершине
  }

  // если начальная вершина не совпадает - пути не существует
  if (path[0] !== start) return null;
  return path;
}

const graph1 = {
  S: { A: 1, B: 4 }, 
  A: { S: 1, B: 2, C: 5 }, 
  B: { S: 4, A: 2, C: 1, D: 3 },
  C: { A: 5, B: 1, F: 3 },  
  D: { B: 3 },              
  F: { C: 2 },                  
};

const { dist: dist1, prev: prev1 } = dijkstra(graph1, "S");
const path1 = getPath(prev1, "S", "F");

// выводим результат
console.log("Длина:", dist1["F"]);
console.log("Путь:", path1.join(" - "));

// Длина: 7
// Путь: S - A - B - C - F