import React, { createRef } from 'react'

export class View {
  static render(child, prefix = '$') {
    const instance = new child
    instance.id(prefix)
    return instance.render()
  }
  
  dom_name() {
    return 'div'
  }
  
  children() {
    return null
  }
  
  _ref = createRef()
  ref() {
    return this._ref
  }
  
  _prefix = '__'
  id(prefix) {
    if (prefix !== undefined) {
      this._prefix = prefix;
      return prefix;
    }
    return `${this._prefix}/${this.constructor.name}`
  }
  
  attr() {
    return {}
  }
  
  style() {
    return {}
  }
  
  event() {
    return {}
  }
  
  render_children() {
    const children = this.children()
    if (typeof children === 'string' || children === null) {
      return children
    }
    
    const rendered = []
    for (let i = 0; i < children.length; i += 1) {
      const child = children[i]
      const element = React.cloneElement(View.render(child, this.id()), { key: i })
      rendered.push(element)
    }
    return rendered
  }
  
  render() {
    return React.createElement(this.dom_name(), {
      ...this.attr(),
      ...this.event(),
      children: this.render_children(),
      style: this.style(),
      ref: this.ref(),
      id: this.id(),
    })
  }
}

class Input extends View {
  dom_name() {
    return 'input'
  }
  children() {
    return null
  }
  attr() {
    return {
      ...super.attr(),
      type: 'text',
    }
  }
}

class Button extends View {
  dom_name() {
    return 'button'
  }
  children() {
    return 'Click me'
  }
  event() {
    return {
      onClick: e => alert('Ty for click'),
    }
  }
}

class Header extends View {
  children() {
    return 'ID GENERATION APP'
  }
}

class Application extends View {
  children() {
    return [
      Header,
      Input,
      Button,
    ]
  }
}

export default Application
