import React, { useState } from "react";
import { useAdequateComponent } from "./adequate";
import { Card, Text, Button } from "./components";

function Dialog(props) {
  const dialog = useAdequateComponent(Dialog, props);
  return (
    <dialog.root as={Card}>
      <dialog.header as={Card.Header}>
        <dialog.title as={Text.Title}>Welcome</dialog.title>
      </dialog.header>
      <dialog.body as={Card.Body}>How are you?</dialog.body>
      <dialog.footer as={Card.Footer}>
        <dialog.button_cancel as={Button}>Cancel</dialog.button_cancel>
        <dialog.button_ok as={Button}>Ok</dialog.button_ok>
      </dialog.footer>
    </dialog.root>
  );
}
export default () => {
  console.log('render');
  const [count, setCount] = useState(0);
  return (
    <>
      <Dialog
        title={{ children: 'COUNTER' }}
        button_ok={{ onClick: () => setCount(count + 1), children: '+' }}
        button_cancel={{ onClick: () => setCount(count - 1), children: '-' }}
        body={{ children: `VALUE: ${count}` }}
      />
      {/*<Dialog*/}
      {/*  button_cancel={{ children: 'Pls click me' }}*/}
      {/*  body={{ children: 'Where are you?' }}*/}
      {/*/>*/}
      {/*<Dialog button_ok={{ children: 'Dont click me' }} />*/}
    </>
  );
}
