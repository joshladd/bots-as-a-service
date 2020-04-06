import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders have top bar with buttons', () => {
  const { getByText } = render(<App />);
});
