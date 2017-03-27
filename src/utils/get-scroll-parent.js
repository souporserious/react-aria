export default function getScrollParent(node) {
  if (node === null) {
    return null
  }
  if (node.scrollHeight > node.clientHeight) {
    return node
  } else {
    return getScrollParent(node.parentNode)
  }
}
