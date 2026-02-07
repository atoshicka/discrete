function countConnectedComponents(graph) {
    //множество всех вершин графа, которые ещё не проверены.
    let vertices = new Set(Object.keys(graph));
    //счётчик. считает сколько компонент связности найдено.
    let components = 0;

    while (vertices.size > 0) {
        //первая вершина из оставшихся непроверенных. с нее начинаем поиск.
        let startVertex = vertices.values().next().value;
        //множество вершин, которые уже проверили.
        let visited = new Set();
        //хранит вершины, которые нужно проверить.
        let stack = [startVertex];

        while (stack.length > 0) {
            //текущая вершина.
            let current = stack.pop();
            
            if (!visited.has(current)) {
                visited.add(current);
                if (graph[current]) {
                    for (let neighbor of graph[current]) {
                        if (!visited.has(neighbor)) {
                            stack.push(neighbor);
                        }
                    }
                }
            }
        }
        for (let vertex of visited) {
            vertices.delete(vertex);
        }
        components++;
    }
    
    return components;
}

const graph = {
    'A': ['B', 'C'],
    'B': ['A'],
    'C': ['A'],
    'D': ['E'],
    'E': ['D'],
    'F': []
};

console.log(countConnectedComponents(graph));