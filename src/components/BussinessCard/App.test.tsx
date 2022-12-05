import React from 'react';
import { render } from '@testing-library/react.tsx';
import App from './App';

test('renders learn react.tsx link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
