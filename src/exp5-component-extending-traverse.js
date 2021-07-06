import React from 'react';
import { useAdequateComponent as $ } from './adequate';
import { Button, Card, Text } from './components';

function Dialog(props) {
  const dialog = $(Dialog, props);
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
const alt = `
  dialog 
    as Card
    
`

function DialogBadPermissions(props) {
  const dialog = $(DialogBadPermissions, props, Dialog);
  return (
    <dialog.root>
      <dialog.body>Недостаточно прав</dialog.body>
    </dialog.root>
  )
}

export default () => <>
  <h1>ops</h1>
  <DialogBadPermissions />
</>
