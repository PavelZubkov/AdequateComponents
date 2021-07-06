import React from 'react'

const useVal = ( propVal ) => {
  const [stateVal, setStateVal] = React.useState(propVal)
  
  // const val = propVal ?? stateVal

  return function val( next ) {
    if ( next !== undefined ) {
      setStateVal(next)
      return next
    }
    
    return stateVal 

  }
}

// Каждое свойство - это функция

function View(p) {
  try {
    const {
      tag = 'div',
      children = null,
      Children = [],
      ...other
    } = p

    const node = React.createElement(
      tag,
      {
        children,
        ...other,
      },
      ...Children
    )
    return node
  } catch(ex) {
    console.error(ex)
    return <pre style={{ border: '1px solid red' }}>{ex.stack}</pre>
  }
}

/*
```view.tree
$.Input $.View
  tag \input
  type \text
  placeholder \Type me
  value <= val \
  onChange => val
```
*/
function Input(p) {
  const val = useVal('')
  
  return View(p.props({ ...p , val: p.val ? p.val : val }))
}

// Тут мы объявляем свойства - интерфейс компонента, то что можно в нем переопределить
// И тут же указываем дефолтные значения
Input.defaultProps = {
  tag: () => 'input',

  type: () => 'text',

  placeholder: () => 'Type me',
  
  onChange: (p) => (e) => p.val(e.target.value),

  value: (p) => p.val(),

  props: (p) => ({
    tag: p.tag(p),
    type: p.type(p),
    placeholder: p.placeholder(p),
    onChange: p.onChange(p),
    value: p.value(p)
  }),
}

/*
  $.App $.View
    Children /
      Name Input
        val <=> name \
      Display View
        Children / <= name
*/
function App(p) {
  const name = useVal('')
  
  const pp = {
    ...p,
    name: p.name ? p.name : name,
  }

  console.log('name', pp.name())

  return View(p.props(pp))
}

App.defaultProps = {
  Name: (p) => <Input val={p.name} />,
  
  Display: (p) => View({ Children: [p.name()] }),

  Children: (p) => [p.Name(p), p.Display(p)],
  
  props: (p) => ({
    Children: p.Children(p)
  }),
}

export default () => {
  return <App />
}