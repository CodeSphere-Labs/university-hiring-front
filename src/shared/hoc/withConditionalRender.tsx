import React from 'react';

export const withConditionalRender = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  condition: (props: P) => boolean
) => {
  // eslint-disable-next-line zeroqs-react/function-component-definition
  return function WithConditionalRenderComponent(props: P) {
    return condition(props) && <WrappedComponent {...props} />;
  };
};
