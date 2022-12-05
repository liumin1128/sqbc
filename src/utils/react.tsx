import React from 'react';
import ReactDOM from 'react-dom/client';

export function domRender(Component: React.ElementType) {
  const element = document.createElement('div');
  document.body.appendChild(element);

  const destroy = () => {
    if (element) {
      document.body.removeChild(element);
    }
  };

  const root = ReactDOM.createRoot(element);

  root.render(<Component destroy={destroy} document={document} />);

  return { destroy, ref: element };
}
