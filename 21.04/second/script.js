function dijkstraAllPaths(graph, start) {
  const dist = {};
  const prev = {};
  const visited = new Set();  // множество обработанных вершин

  for (const node in graph) {
    dist[node] = Infinity;
    prev[node] = [];
  }
  dist[start] = 0;

  while (true) {
    // выбираем необработанную вершину с минимальным расстоянием
    let u = null;
    for (const node in dist) {
      if (!visited.has(node) && (u === null || dist[node] < dist[u])) {
        u = node;
      }
    }

    if (u === null || dist[u] === Infinity) break;

    visited.add(u);

    // обновляем расстояния до соседей
    for (const [neighbor, weight] of Object.entries(graph[u])) {
      const newDist = dist[u] + weight;  // новое расстояние

      if (newDist < dist[neighbor]) {
        // нашли путь короче - сбрасываем список предков
        dist[neighbor] = newDist;
        prev[neighbor] = [u];
      } else if (newDist === dist[neighbor]) {
        prev[neighbor].push(u);
      }
    }
  }

  return { dist, prev };
}

//восстановление всех путей
function getAllPaths(prev, start, end) {
  // если начальная и конечная вершины совпадают
  if (end === start) return [[start]];
  
  // если нет предков - путь не существует
  if (prev[end].length === 0) return [];

  const paths = [];
  // перебираем всех предков
  for (const parent of prev[end]) {
    // находим все пути
    const subPaths = getAllPaths(prev, start, parent);
    // добавляем текущую вершину в конец каждого найденного пути
    for (const sub of subPaths) {
      paths.push([...sub, end]);
    }
  }
  return paths;
}

const graph2 = {
  X: { A: 3, B: 2 },
  A: { X: 3, Y: 1 },
  B: { X: 2, Y: 2 },
  Y: { A: 1, B: 2 },
};

const { dist: dist2, prev: prev2 } = dijkstraAllPaths(graph2, "X");
const allPaths = getAllPaths(prev2, "X", "Y");

console.log("Длина:", dist2["Y"]);
console.log("Пути:");
allPaths.forEach((p, i) => console.log(`  ${i + 1}. ${p.join(" - ")}`));

// Длина: 4
// Пути:
//   1. X - A - Y
//   2. X - B - Y