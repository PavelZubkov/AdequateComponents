import React from 'react';
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
export default () => (<>
    <Dialog
      title={{ as: 'p' }}
      button_cancel={null}
      button_ok={(...props) => <button type="button" {...props}><h1>ops</h1></button>}
    />
    {/*<Dialog*/}
    {/*  button_cancel={{ children: 'Pls click me' }}*/}
    {/*  body={{ children: 'Where are you?' }}*/}
    {/*/>*/}
    {/*<Dialog button_ok={{ children: 'Dont click me' }} />*/}
</>);
