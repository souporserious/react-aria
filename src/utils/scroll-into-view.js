import getScrollParent from './get-scroll-parent.js'

export default function scrollIntoView(node) {
  const scrollParent = getScrollParent(node)
  const nodeTop = node.offsetTop - scrollParent.offsetTop
  if (nodeTop <= scrollParent.scrollTop) {
    scrollParent.scrollTop = nodeTop
  } else if (nodeTop + node.offsetHeight >= scrollParent.scrollTop + scrollParent.offsetHeight) {
    scrollParent.scrollTop = (nodeTop + node.offsetHeight) - scrollParent.offsetHeight
  }
}
