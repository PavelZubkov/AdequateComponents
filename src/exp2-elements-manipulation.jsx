import React, { Fragment } from "react";
import { Card, Text, Button } from "./components";
import traverse from './traverse';
import { useAdequateComponent } from "./adequate";

function Dialog(props) {
  const dialog = useAdequateComponent(Dialog);
  const node = (
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
  return node;
}

const AlertButton = (props) => (
  <button onClick={() => alert('newer ok')}>
    {props.children} dont click
  </button>
);

const node = Dialog(); //
const EnterButton = () => traverse(node, {
  dialog_button_cancel: AlertButton,
});

export default () => <>
    <EnterButton />
  </>;



