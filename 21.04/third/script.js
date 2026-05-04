function dijkstraAll(graph, start) {
  const dist = {};
  const visited = new Set();  // множество посещенных вершин

  for (const node in graph) {
    dist[node] = Infinity;
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

    // если все вершины посещены или оставшиеся недостижимы - выходим
    if (u === null || dist[u] === Infinity) break;
    
    // помечаем вершину как посещенную
    visited.add(u);

    // обновляем расстояния до соседей текущей вершины
    // перебираем всех соседей вершины u
    for (const [neighbor, weight] of Object.entries(graph[u])) {
      const newDist = dist[u] + weight;  // новое расстояние
      if (newDist < dist[neighbor]) {
        dist[neighbor] = newDist;  // обновляем расстояние, если нашли путь короче
      }
    }
  }

  // заменяем бесконечность на -1 для недостижимых вершин
  for (const node in dist) {
    if (dist[node] === Infinity) dist[node] = -1;
  }

  return dist;
}

const graph3 = {
  A: { B: 5 }, 
  B: { A: 5 },
  D: { C: 3, E: 2 }, 
  C: { D: 3 }, 
  E: { D: 2 }, 
};

const dist3 = dijkstraAll(graph3, "A");

for (const [node, d] of Object.entries(dist3)) {
  console.log(`${node}: ${d}`);
}

// A: 0 
// B: 5
// C: -1
// D: -1
// E: -1