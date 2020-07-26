import React from "react";

export function kindOf(node) {
  if(node === null || node === void 0 || typeof node === 'boolean') {
    return 'Empty';
  }
  if(typeof node === 'string' || typeof node === 'number') {
    return 'Text';
  }
  if(Array.isArray(node)) {
    return 'Fragment';
  }
  const { type } = node;
  if(typeof type === 'string') {
    return 'DOMElement';
  }
  return 'ComponentElement';
}

export function defaultTraverse(path, type) {
  const kind = kindOf(path.node);
  if(kind === 'Empty') {
    return path.node;
  }
  if(kind === 'Text') {
    return path.node;
  }
  if(kind === 'Fragment') {
    return path.node.map(path.traverse);
  }
  debugger;
  return React.cloneElement(
    path.node,
    path.node.props,
    ...path.traverseChildren(),
  );
}

export default function traverse(node, visitor, trace = []) {
  const {
    Empty = defaultTraverse,
    Text = defaultTraverse,
    Fragment = defaultTraverse,
    DOMElement = defaultTraverse,
    ComponentElement = defaultTraverse,
  } = visitor;
  const path = {
    node,
    kindOf,
    defaultTraverse() {
      return defaultTraverse(path);
    },
    traverse(childNode, childVisitor = visitor) {
      return traverse(childNode, childVisitor);
    },
    traverseChildren(childVisitor = visitor) {
      return React.Children.toArray(path.node.props.children).map(
        (childNode) => path.traverse(childNode, childVisitor)
      );
    },
    visitor,
  };
  if(node === null || node === void 0 || typeof node === 'boolean') {
    console.log('empty value');
    return Empty(path); // eslint-disable-line new-cap
  }
  if(typeof node === 'string' || typeof node === 'number') {
    return Text(path); // eslint-disable-line new-cap
  }
  if(Array.isArray(node)) {
    return Fragment(path); // eslint-disable-line new-cap
  }
  const { type } = node;
  if(typeof type === 'string') {
    return DOMElement(path); // eslint-disable-line new-cap
  }
  const name = type.displayName || type.name || 'unknonw';
  if (visitor[name]) {
    const updatedNode = {
      ...path.node,
      type: visitor[name],
    }
    path.node = updatedNode;
  }
  return ComponentElement(path); // eslint-disable-line new-cap //
}
