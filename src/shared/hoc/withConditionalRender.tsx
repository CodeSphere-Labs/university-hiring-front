import React from 'react'

export const withConditionalRender = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  condition: (props: P) => boolean,
) => {
  return function WithConditionalRenderComponent(props: P) {
    return condition(props) && <WrappedComponent {...props} />
  }
}
