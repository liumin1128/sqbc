import React from 'react';
import ReactDOM from 'react-dom';

export function domRender(Component: React.ElementType) {
  const element = document.createElement('div');
  document.body.appendChild(element);
  function destory() {
      const unmountResult = ReactDOM.findDOMNode(element) // eslint-disable-line
    if (unmountResult && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }

  ReactDOM.render(
    <Component destory={() => destory()} document={document} />,
    element,
  );

  return { destory, ref: element };
}
