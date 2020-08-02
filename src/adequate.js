import React, { isValidElement } from "react";
import { kindOf, nodeType } from './traverse/traverse';

// На классы переписать мб?

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
    const suffixName = prop.toLowerCase();
    const displayName = `${prefixName}_${suffixName}`.replace('_root', '');
    
    // debugger;
    // Запомнить все вызовы расширяющего компонента и пропсы
    // Когда начнуться вызовы расширяемого компонента, использовать запомненые данные
    // матчить по структуре
    // if (ExtendedComponent && suffixName === 'root' && extended === false) {
    //   extended = true;
    //   return ExtendedComponent;
    // }
    // if (ExtendedComponent && extended === true) {
    //   return () => null;
    // }
    
    // пропсы храняться в замыкании. Насколько это плохо и как это может порведить
    // я про globalProps
    function ProxyComponent(props) {
        // debugger;
        // const a = { Component, globalProps, suffixName, displayName };
        const { as = 'div', className = '', ...rest } = props;
  
        let injectedProps = globalProps[suffixName];
        if (injectedProps === null) {
          return null;
        }
        if (!injectedProps) {
          injectedProps = {};
        }
  
        const cn = [className, displayName, injectedProps.className || ''].filter(Boolean).join(' ');
        injectedProps.className = cn; // TODO className replace or extend?
  
        const component = typeof injectedProps === 'function' // TODO not work
          // function check for possibility passing component
          ? injectedProps
          : injectedProps.as || as;
        delete injectedProps.as;
  
        try {
          if (typeof component === 'string') {
            return React.createElement(component, {
              ...rest,
              ...injectedProps,
            });
          }
          // TODO check class/functional component
          // TODO Насколько плохо для производительности то что я руками вызывавю компонент?
          // Заметь что у меня и так возвращает ProxyComponent
          // а component(rest) вызовится, когда реконсилер запустит этот компонент
          
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
          
          return React.cloneElement(component(rest), {
            ...rest,
            ...injectedProps,
          });
          // return React.createElement(component, {
          //   ...rest,
          //   ...injectedProps,
          // });
          // const Com = component;
          // return <Com {...{...rest, ...injectedProps}} />
        } catch (ex) {
          console.error(`Error in ${cn}`);
          return <span class={`${cn} error`} style={{ background: 'red' }}>
            {ex.message}
          </span>
        }
    };
    ProxyComponent.displayName = displayName;
    return ProxyComponent;
  };
  const proxy = new Proxy(comTarget, { get: getter })
  return proxy;
};

export function $component(Component) {
  const definer = useAdequateComponent(Component, );
  return Component.apply()
}
// надо создать дефолтные пропы и установить им реальные компоненты
// и заюзать их вместо реальных компонентов
