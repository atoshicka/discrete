// Создаём узел дерева
function Node(val) {
  return { val, left: null, right: null };
}

// DFS: корень -> левый -> правый
function dfs(node, result = []) {
  if (node === null) return result;
  result.push(node.val);   // 1. Записываем корень
  dfs(node.left, result);  // 2. Идём влево
  dfs(node.right, result); // 3. Идём вправо
  return result;
}

// Строим дерево
const root = Node(1);
root.left = Node(2);
root.right = Node(3);
root.left.left = Node(4);
root.left.right = Node(5);

console.log(dfs(root)); // [1, 2, 4, 5, 3]