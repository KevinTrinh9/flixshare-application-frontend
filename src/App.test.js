import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { toBeInTheDocument } from '@testing-library/jest-dom/extend-expect'; // Import the toBeInTheDocument function
import App from './App';

// Mock the axios module
jest.mock('axios', () => ({
  get: jest.fn(),
}));

test('renders the App component', () => {
  render(
    <Router>
      <App />
    </Router>
  );

  // You can add more specific assertions based on your component's content
  const linkElement = screen.getByText(/Welcome/i);
  expect(linkElement).toBeInTheDocument();
});
