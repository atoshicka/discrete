function Node(val) {
  return { val, left: null, right: null };
}

// функция для вывода дерева
function dfs(node, result = []) {
  if (node === null) return result;
  result.push(node.val);
  dfs(node.left, result);
  dfs(node.right, result);
  return result;
}

// Зеркальное отражение дерева
function mirrorTree(node) {
  if (node === null) return null;
  // Меняем местами левое и правое
  [node.left, node.right] = [node.right, node.left];
  // Зеркалим каждое поддерево
  mirrorTree(node.left);
  mirrorTree(node.right);
  return node;
}

const root = Node(1);
root.left = Node(2);
root.right = Node(3);
root.left.left = Node(4);
root.left.right = Node(5);

console.log("До: ", dfs(root)); // [1, 2, 4, 5, 3]
mirrorTree(root);
console.log("После: ", dfs(root)); // [1, 3, 2, 5, 4]