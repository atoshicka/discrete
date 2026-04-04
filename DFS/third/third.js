function Node(val) {
  return { val, left: null, right: null };
}

// Максимальная глубина дерева
function maxDepth(node) {
  if (node === null) return 0;
  const leftDepth = maxDepth(node.left);    // глубина левой ветки
  const rightDepth = maxDepth(node.right);  // глубина правой ветки
  return 1 + Math.max(leftDepth, rightDepth);
}

const root = Node(1);
root.left = Node(2);
root.right = Node(3);
root.left.left = Node(4);
root.left.right = Node(5);

console.log(maxDepth(root)); // 3