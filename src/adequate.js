import React from "react";

export const useAdequateComponent = (Component, globalProps) => {
  const prefixName = (Component.displayName || Component.name).toLowerCase();
  const getter = (target, prop) => {
    const suffixName = prop.toLowerCase();
    const displayName = `${prefixName}_${suffixName}`.replace('_root', '');
    
    return function ProxyComponent(props) {
      ProxyComponent.displayName = displayName;
      const { as: component, className = '', ...rest } = props;
      const cn = [className, displayName].filter(Boolean).join(' ');
      
      const injectedProps = globalProps[suffixName] || {};
      
      if (typeof component === 'string') {
        return React.createElement(component, {
          className: cn,
          ...rest,
          ...injectedProps,
        });
      }
      return React.cloneElement(component(rest), {
        className: cn,
        ...rest,
        ...injectedProps,
      });
    };
  };
  return new Proxy({}, { get: getter })
};
// надо создать дефолтные пропы и установить им реальные компоненты
// и заюзать их вместо реальных компонентов
