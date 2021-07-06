/* WORK */
import React, { useState } from "react";
import { useAdequateComponent } from "./adequate";
import { Card, Text, Button, Icon } from "./components";

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

class Dialog {
  
  Dialog() {
    return (
      <div class="Card Dialog">
        {}
      </div>
    )
  }

  children() {
  }
}

/*
  <dialog as={Card}>
    <header as={Card.Header}>
      <title as={Text.Title}>Welcome</title>
    </header>
    <body as={Card.Body}>How are you?</body>
    <footer as={Card.Footer}>
      <button_cancel as={Button}>Cancel</button_cancel>
      <button_ok as={Button}>Ok</button_ok>
    </footer>
  </dialog>
  
  {
    __name: 'dialog',
    as: Card,
    children: [
      {
        __name: 'header'.
        as: Card.Header,
        children: [
          {
            __name: 'title',
            children: 'Welcome',
          }
        ],
      },
      {
        __name: 'body',
        as: Card.Body,
        children: 'How are you?',
      },
      {
        __name: 'footer',
        as: Card.Footer,
        children: [
          {
            __name: 'button__ok',
            children: {
              __name: 'ok',
              as: Button,
              children: 'ok',
            }
          },
          {
            __name: 'button__cancel',
            children: {
              __name: 'cancel',
              as: Button,
              children: 'cancel',
            }
          },
        ],
      },
    ]
  }

  {
    dialog: {
      header: {
        title: {
          $as: Text.Title,
          $children: "Welcome",
        },
      },
      body: {},
      footer: {},
    }
  }
*/

// Как будут вести пропсы по дефолту и т.п.
/*
  мы селектим элемент относительно которого, что-то делаем
  капсом написанно что именно делаем
  <dialog.header PREPEND>...</dialog.header>
  
  PREPEND - добавляем первым потомком
  APPEND - добавляем последним потомком
  BEFORE - добавляем перед
  AFTER - добавляем после
  REPLACE - меняем
 */

// Добаить кнопку Close с иконкой, в конец хидера, за title
// function DialogClosable() {
//   return (
//     <Dialog>{dialog => (
//        <dialog.header APPEND>
//          <dialog.button_close as={Button}>
//            <dialog.icon_close as={Icon.Cross} />
//          </dialog.button_close>
//        </dialog.header>
//     )}</Dialog>
//   );
// }

// export default () => {
//   return (
//     <>
//       <Dialog>{dialog => (
//         <dialog.title $children>Go out</dialog.title>
//       )}</Dialog>
//     </>
//   );
// }

// export default () => {
//   return (
//     <>
//       <Dialog>{dialog => (
//         <dialog.header $append>
//           <dialog.button_close as={Button}>X</dialog.button_close>
//         </dialog.header>
//       )}</Dialog>
//     </>
//   );
// }

// export default () => {
//   return (
//     <>
//       <Dialog>{dialog => (
//         <dialog.header $prepend>
//           <dialog.button_close as={Button}>X</dialog.button_close>
//         </dialog.header>
//       )}</Dialog>
//     </>
//   );
// }

// export default () => {
//   return (
//     <>
//       <Dialog>{dialog => (
//         <dialog.header $before>
//           <dialog.button_close as={Button}>X</dialog.button_close>
//         </dialog.header>
//       )}</Dialog>
//     </>
//   );
// }

// export default () => {
//   return (
//     <>
//       <Dialog>{dialog => (
//         <dialog.header $after>
//           <dialog.button_close as={Button}>X</dialog.button_close>
//         </dialog.header>
//       )}</Dialog>
//     </>
//   );
// }

// export default () => {
//   return (
//     <>
//       <Dialog>{dialog => (
//         <dialog.header $remove />
//       )}</Dialog>
//     </>
//   );
// }

// children dialog.body обернется в dialog.message
// получится:
/*
  <dialog.body>
    <dialog.message>{dialog.body.children}</dialog.message>
  </dialog.body>
 */
// export default () => {
//   return (
//     <>
//       <Dialog>{dialog => (
//         <dialog.body $wrap>
//           <dialog.message as={Text.Accent} />
//         </dialog.body>
//       )}</Dialog>
//     </>
//   );
// }

// удалится хедер, вместо него будут его дети
export default () => {
  return (
    <>
      <Dialog>{dialog => (
        <dialog.header $unwrap />
      )}</Dialog>
    </>
  );
}
