import React from 'react'

class Button extends React.Component {
  button_onClick() {
    return this.props.button_onClick();
  }
  button_text() {
    return this.props.button_text || 'click me';
  }
}
