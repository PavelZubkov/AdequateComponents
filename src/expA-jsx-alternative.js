import React from 'react';
import { Button, Card, Text } from './components';

/*
  jsx транспилится напрямую в вызовы createElement, типа:
  createElement('div', {
    children: createElement('h1', { children: 'Hello fucking world' }),
  })
  
  Как насчет того, что бы компилить это во что-нибудь поумнее?
  Попробую руками закодить результат компиляции

  что такое jsx вообще?
  язык описания композиции компонент
  по факту его юзают как верстку, где наряду со встроеными компонентами можно вставлять пользовательские
 */
// const Source = (props) => {
//   return (
//     <Card className="dialog">
//       <Card.Header className="dialog_header">
//         <Text.Title className="dialog_title">Welcome</Text.Title>
//       </Card.Header>
//       <Card.Body className="dialog_body">How are you?</Card.Body>
//       <Card.Footer className="dialog_footer">
//         <Button className="dialog_button-cancel">Cancel</Button>
//         <Button className="dialog_button-ok">Ok</Button>
//       </Card.Footer>
//     </Card>
//   );
// }

class View {
  
  dom_name() {
    return 'div'
  }
  
  dom_id() {
    return this.toString();
  }
  
  children() {
    return null
  }
  
  _ref = createRef()
  ref() {
    return this._ref
  }
  
  attr() {
    return {};
  }
  
  style() {
    return {};
  }
  
  event() {
    return {}
  }
  
  render = () => {
    return React.createElement(this.tag(), {
      ...this.prop(),
      ...this.event(),
      children: this.children(),
      style: this.style(),
      ref: this.ref(),
    })
  }
}

class R {
  title_text() {
    return 'Welcome';
  }
  
  body_text() {
    return 'How are you?';
  }
  
  button_cancel_text() {
    return 'Cancel';
  }
  
  button_ok_text() {
    return 'Ok';
  }
  
  Title() {
    return (
      <div className="title">
        {this.title_text()}
      </div>
    )
  }
  
  Header() {
    return (
      <div className="dialog_header">
        {this.Title()}
      </div>
    )
  }
  
  Body() {
    return (
      <div className="dialog_body">
        {this.body_text()}
      </div>
    )
  }
  
  Button_cancel() {
    return (
      <button className="button-cancel">
        {this.button_cancel_text()}
      </button>
    )
  }
  
  Button_ok() {
    return (
      <button className="button-ok">
        {this.button_ok_text()}
      </button>
    )
  }
  
  Footer() {
    return (
      <div className="dialog_footer">
        {this.Button_cancel()}
        {this.Button_ok()}
      </div>
    )
  }
  
  Dialog() {
    return (
      <div className="dialog">
        {this.Header()}
        {this.Body()}
        {this.Footer()}
      </div>
    )
  }
  
  render() {
    return this.Dialog();
  }
}

const Result = (props) => {
  const r = new R
  return r.render();
};

export default Result;
