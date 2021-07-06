import React, { isValidElement } from 'react';
import { kindOf, nodeType } from './traverse/traverse';

// На классы переписать мб?

const spy = [];

// Я не могу осмыслить как это все в комплесе работает
// Полная картина никак не укладывается в голове
// Мб поразбираться как реконсилер работае
// И подебажить прямо в нем рендеринг моих компонентов
// Идея норм, но на это удейт пару месяцув, го

function injectParentIdToChildren(children, id, i) {
  return React.Children.map(children, (child, index) => {
    if (typeof child === 'string') return child;
    const key = child.key;
    console.log(key);
    return React.cloneElement(child, { parentId: `${id}${key ? '/' + key : ''}` });
  });
}
// TODO not work after refactor
function slots(extNode) {
  if (extNode && extNode.type.displayName === displayName) {
    if (extNode.props.$children) {
      return React.cloneElement(component(rest), {
        ...rest,
        ...injectedProps,
        children: extNode.props.children,
      });
    }
    if (extNode.props.$append) {
      return React.cloneElement(component(rest), {
        ...rest,
        ...injectedProps,
        children: (
          <>
            {rest.children || injectedProps.children}
            {extNode.props.children}
          </>
        )
      })
    }
    if (extNode.props.$prepend) {
      return React.cloneElement(component(rest), {
        ...rest,
        ...injectedProps,
        children: (
          <>
            {extNode.props.children}
            {rest.children || injectedProps.children}
          </>
        )
      })
    }
    if (extNode.props.$before) {
      return (
        <>
          {extNode.props.children}
          {React.cloneElement(component(rest), {
            ...rest,
            ...injectedProps,
          })}
        </>
      );
    }
    if (extNode.props.$after) {
      return (
        <>
          {React.cloneElement(component(rest), {
            ...rest,
            ...injectedProps,
          })}
          {extNode.props.children}
        </>
      );
    }
    if (extNode.props.$remove) {
      return null;
    }
    if (extNode.props.$wrap) {
      return React.cloneElement(component(rest), {
        ...rest,
        ...injectedProps,
        children: React.cloneElement(extNode.props.children, {
          children: rest.children || injectedProps.children,
        }),
      });
    }
    if (extNode.props.$unwrap) {
      return rest.children || injectedProps.children;
    }
  }
  
}

export const useAdequateComponent = (Component, globalProps) => {
  const prefixName = (Component.displayName || Component.name).toLowerCase();
  
  let extTarget = {};
  let comTarget = {};
  let extNode;
  if (typeof globalProps.children === 'function') {
    extNode = globalProps.children(new Proxy(extTarget, { get: getter }));
    // Add utils for find
    // working with modes
  }
  
  function getter(target, prop) {
    const suffixName = prop.toLowerCase().replace('root', '');
    const displayName = [prefixName, suffixName].filter(Boolean).join('_');
    
    function ProxyComponent(props) {
      const { as = 'div', className = '', parentId = '', ...rest } = props;
      
      let injectedProps = globalProps[suffixName];
      if (injectedProps === null) {
        return null; // Не рендерить заnullенный компонент
      }
      if (!injectedProps) {
        injectedProps = {};
      }
      
      const cn = [className, displayName, injectedProps.className || ''].filter(Boolean).join(' ');
      const id = [parentId, displayName].join('/');
      injectedProps.className = cn; // TODO className replace or extend?
      injectedProps.id = id;
      
      const Component = typeof injectedProps === 'function' // TODO not work
        // function check for possibility passing component
        ? injectedProps
        : injectedProps.as || as;
      delete injectedProps.as;
      
      const mergedProps = { ...rest, ...injectedProps, parentId: id };
      // if (mergedProps.children) {
      //   mergedProps.children = injectParentIdToChildren(mergedProps.children, id);
      // }
      
      // NOTE все еще делаешь генерацию айдишников
      // На ней сфокусируйс плз
      try {
        // Почему в таком случае все кнопки вывелись как есть без переопределенных пропсов
        // const a = <Component {...mergedProps} />
        // const b = React.cloneElement(Component(mergedProps), mergedProps); // В таком случае все ок
        // console.log(a);
        // console.log(b);
        
        // TODO restore slots
        if (typeof Component === 'string') {
          return React.createElement(Component, mergedProps);
        }
        return React.cloneElement(Component(mergedProps), mergedProps); // В таком случае все ок
      } catch (ex) {
        console.error(`Error in ${cn}`);
        return (
          <span className={`${cn} error`} style={{ background: 'red' }}>
            {ex.message}
          </span>
        );
      }
    };
    ProxyComponent.displayName = displayName;
    return ProxyComponent;
  };
  const proxy = new Proxy(comTarget, { get: getter })
  return proxy;
};
