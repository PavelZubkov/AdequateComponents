import React from 'react';

export const nodeType = {
  Empty: 'Empty',
  Text: 'Text',
  Fragment: 'Fragment',
  DOMElement: 'DOMElement',
  ComponentElement: 'ComponentElement',
}

export function kindOf(node) {
  if(node === null || node === void 0 || typeof node === 'boolean') {
    return nodeType.Empty;
  }
  if(typeof node === 'string' || typeof node === 'number') {
    return nodeType.Text;
  }
  if(Array.isArray(node)) {
    return nodeType.Fragment;
  }
  const { type } = node;
  if(typeof type === 'string') {
    return nodeType.DOMElement;
  }
  return nodeType.ComponentElement;
}

export function defaultTraverse(path, stack = []) {
  const kind = kindOf(path.node);
  console.log('kind', kind, 'stack', stack);
  if(kind === 'Empty') {
    return path.node;
  }
  if(kind === 'Text') {
    return path.node;
  }
  if(kind === 'Fragment') {
    return path.node.map(path.traverse);
  }
  if (kind === nodeType.DOMElement) {
    return React.cloneElement(path.node, {
      ...path.node.props,
      className: 'ops',
      foo: 'bar',
      dome: 'true',
    });
  }
  // Могу ли я вызвать функцию, которая в реактовских нодах? || yes
  const props = {
    ...path.node.props,
    className: 'ops',
    foo: 'bar',
  };
  // Так как же это отразиться на реакте, если я буду руками вызывать функции render у компонентов?
  // ps реконсилер обидится?
  // смотри исходники
  // кмк возможно прокатит - вызвать, что-то сделать и завернуть обратно в функцию
  return React.cloneElement(path.node.type(props),{
    ...path.node.props,
    className: 'ops',
    foo: 'bar',
  } , ...path.traverseChildren(stack));
}

function traverse(node, visitor, stack= []) {
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
    traverse(childNode, stack, childVisitor = visitor) {
      return traverse(childNode, childVisitor, stack);
    },
    traverseChildren(stack, childVisitor = visitor) {
      return React.Children.toArray(path.node.props.children).map(
        (childNode) => path.traverse(childNode, stack, childVisitor)
      );
    },
    visitor,
  };
  // debugger;
  if(node === null || node === void 0 || typeof node === 'boolean') {
    return Empty(path);
  }
  if(typeof node === 'string' || typeof node === 'number') {
    return Text(path);
  }
  if(Array.isArray(node)) {
    console.log('child');
    return Fragment(path);
  }
  const { type } = node;
  if(typeof type === 'string') {
    debugger;
    return DOMElement(path, stack);
  }
  const name = type.displayName || type.name || 'unknown';
  stack.push(name); console.log('pushed', name, 'stack', stack);
  const res = ComponentElement(path, stack);
  const poped = stack.pop(); console.log('poped', poped, 'stack', stack);
  return res;
}

function Card(props) {
  return <div>{props.children}</div>
}

function CardHeader(props) {
  return <header>{props.children}</header>
}

function Title(props) {
  return <h1>{props.children}</h1>
}

function Test(props) {
  return traverse(
    <Card>
      <CardHeader>
        <Title>Hello fucking world</Title>
        <Title>Opsops</Title>
        <h2>wow</h2>
      </CardHeader>
    </Card>
  , {});
}

export default () => (
  <>
    <h1>ops</h1>
    <Test />
  </>
);
