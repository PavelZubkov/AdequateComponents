import React, { isValidElement } from "react";
import { kindOf, nodeType } from './traverse';

export const useAdequateComponent = (Component, globalProps) => {
  const prefixName = (Component.displayName || Component.name).toLowerCase();
  const getter = (target, prop) => {
    const suffixName = prop.toLowerCase();
    const displayName = `${prefixName}_${suffixName}`.replace('_root', '');
    
    return function ProxyComponent(props) {
      ProxyComponent.displayName = displayName;
      const { as, className = '', ...rest } = props;
  
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
        ? injectedProps
        : injectedProps.as || as;
      delete injectedProps.as;
      
      if (typeof component === 'string') {
        return React.createElement(component, {
          ...rest,
          ...injectedProps,
        });
      }
      // TODO check class/functional component
      return React.cloneElement(component(rest), {
        ...rest,
        ...injectedProps,
      });
    };
  };
  return new Proxy({}, { get: getter })
};
// надо создать дефолтные пропы и установить им реальные компоненты
// и заюзать их вместо реальных компонентов
