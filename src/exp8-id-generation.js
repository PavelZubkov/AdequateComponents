import React, { useState } from 'react';
import { useAdequateComponent } from "./adequate";

function Button(props) {
  const button = useAdequateComponent(Button, props);
  return (
    <button.root as="button">Click</button.root>
  );
}

function Header(props) {
  const header = useAdequateComponent(Header, props);
  return (
    <header.root>
      <header.title as="h1">Hello fucking world</header.title>
      <header.close as={Button}>GO OUT</header.close>
    </header.root>
  );
}

function Body(props) {
  const body = useAdequateComponent(Body, props);
  return (
    <body.root>
      <body.count as="h3">COUNT: <body.count_val /></body.count>
      <body.increase as={Button}>INC</body.increase>
      <body.decrease as={Button}>DEC</body.decrease>
    </body.root>
  );
}

function Tag(props) {
  const tag = useAdequateComponent(Tag, props);
  return (
    <tag.root>Tag</tag.root>
  );
}

const tags = [1,2,3,4,5];

function Page(props) {
  const page = useAdequateComponent(Page, props);
  const node = (
    <page.root>
      <page.header as={Header} />
      <page.body as={Body} />
      {tags.map(key => <Tag key={key} />)}
    </page.root>
  );
  console.log('node', node);
  return node;
}

const useCounter = () => {
  const [count, set] = useState(0);
  return [count, () => set(count + 1), () => set(count - 1)];
};

// export default () => {
//   const [count, inc, dec] = useCounter();
//   return (
//     <Page
//       header={{
//         close: { onClick: () => alert('GO OUT') }
//       }}
//       body={{
//         count_val: { children: count },
//         increase: { onClick: inc },
//         decrease: { onClick: dec },
//       }}
//     />
//   );
// }
const Foo = () => 'Foo';
export default () => {
  const node = React.createElement(Foo, null);
  console.log(node);
  return node;
};
