import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText('FIRST WEB APP');
  expect(linkElement).toEqual('FIRST WEB APP')
});
