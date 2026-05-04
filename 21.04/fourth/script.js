function dijkstraNetwork(graph, start) {
  const dist = {};
  const prev = {};
  const visited = new Set();  // множество обработанных маршрутизаторов

  for (const node in graph) {
    dist[node] = Infinity;
    prev[node] = null;
  }
  dist[start] = 0;

  while (true) {
    // выбираем необработанный маршрутизатор с минимальной задержкой
    let u = null;  // текущий маршрутизатор с наименьшей задержкой
    for (const node in dist) {
      if (!visited.has(node) && (u === null || dist[node] < dist[u])) {
        u = node;
      }
    }

    if (u === null || dist[u] === Infinity) break;

    visited.add(u);

    // обновляем задержки до соседних маршрутизаторов
    // перебираем всех соседей текущего маршрутизатора
    for (const [neighbor, delay] of Object.entries(graph[u])) {
      const totalDelay = dist[u] + delay;  // общая задержка через текущий маршрутизатор
      if (totalDelay < dist[neighbor]) {
        dist[neighbor] = totalDelay;  // нашли путь с меньшей задержкой
        prev[neighbor] = u;           // запоминаем, откуда пришли
      }
    }
  }
  return { dist, prev };
}

// функция для восстановления маршрута
function getNetworkPath(prev, start, end) {
  const path = [];
  let current = end;

  // восстанавливаем маршрут от конца к началу
  // идем по предкам, пока не дойдём до старта
  while (current !== null) {
    path.unshift(current);    // добавляем маршрутизатор в начало пути
    current = prev[current];  // переходим к предыдущему маршрутизатору
  }

  // если путь не начинается со старта - цель недостижима
  if (path[0] !== start) return null;
  return path;
}

const graph4 = {
  router1: { router2: 10, router3: 20 },
  router2: { router1: 10, router4: 50, router5: 100 },
  router3: { router1: 20, router4: 20 },
  router4: { router2: 50, router3: 20, router5: 10 },
  router5: { router2: 100, router4: 10 },
};

const { dist: dist4, prev: prev4 } = dijkstraNetwork(graph4, "router1");
const path4 = getNetworkPath(prev4, "router1", "router5");

if (path4 === null) {
  console.log("router5 недостижим из router1");
} else {
  console.log("Длина:", dist4["router5"], "мс");
  console.log("Путь:", path4.join(" - "));
}

// Длина: 60 мс
// Путь: router1 - router3 - router4 - router5