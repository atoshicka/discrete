function Node(val) {
  return { val, left: null, right: null };
}

// Сумма всех узлов дерева
function sumTree(node) {
  if (node === null) return 0;
  return node.val + sumTree(node.left) + sumTree(node.right);
}

const root = Node(1);
root.left = Node(2);
root.right = Node(3);
root.left.left = Node(4);
root.left.right = Node(5);

console.log(sumTree(root)); // 15