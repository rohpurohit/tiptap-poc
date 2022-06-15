export function createRect(rect) {
  if (rect == null) {
    return null;
  }
  let newRect = {
    left: rect.left + document.body.scrollLeft,
    top: rect.top + document.body.scrollTop,
    width: rect.width,
    height: rect.height,
    bottom: 0,
    right: 0,
  };
  newRect.bottom = newRect.top + newRect.height;
  newRect.right = newRect.left + newRect.width;
  return newRect;
}

export function absoluteRect(element) {
  return createRect(element.getBoundingClientRect());
}

export function removeNode(node) {
  if (node && node.parentNode) {
    node.parentNode.removeChild(node);
  }
}
