function Node(val) {
  return { val, left: null, right: null };
}

// Поиск значения в дереве
function search(node, target) {
  if (node === null) return false; // дошли до конца - не нашли
  if (node.val === target) return true; // нашли
  // поиск в левом или правом поддереве
  return search(node.left, target) || search(node.right, target);
}

const root = Node(1);
root.left = Node(2);
root.right = Node(3);
root.left.left = Node(4);
root.left.right = Node(5);

console.log(search(root, 5)); // true
console.log(search(root, 9)); // false