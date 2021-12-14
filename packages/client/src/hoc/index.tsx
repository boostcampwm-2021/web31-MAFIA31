import React from 'react';

function withCondition(Component: React.FunctionComponent<any>) {
  /* eslint-disable react/jsx-props-no-spreading */
  return function withConditionComponent({ condition, children, ...props }: any) {
    return <> {condition ? <Component {...props}>{children}</Component> : <></>} </>;
  };
}

export { withCondition };
