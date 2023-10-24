import { screen } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

test('Tests if elements are render on the screen', () => {
  renderWithRouter(<App />, { route: '/' });

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const loginButton = screen.getByTestId('login-submit-btn');

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

test('Tests if user gets redirected to different route when email and password are valid', async () => {
  const { user } = renderWithRouter(<App />, { route: '/' });

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const loginButton = screen.getByTestId('login-submit-btn');

  await user.type(emailInput, 'rick@rick.com');
  await user.type(passwordInput, '123123123');
  await user.click(loginButton);

  expect(window.location.pathname).toBe('/meals');
});
