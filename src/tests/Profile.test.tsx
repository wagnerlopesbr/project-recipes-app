import { screen } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

describe('Testes da página Profile', () => {
  test('Testa se ao clicar no botão done recipes é redirecionado corretamente', async () => {
    const { user } = renderWithRouter(<App />, { route: '/profile' });

    const doneRecipes = screen.getByTestId('profile-done-btn');
    await user.click(doneRecipes);

    expect(screen.getByText('Done Recipes')).toBeInTheDocument();
  });
  test('Testa se ao clicar no botão Favorite Recipes é redirecionado corretamente', async () => {
    const { user } = renderWithRouter(<App />, { route: '/profile' });

    const favorite = screen.getByTestId('profile-favorite-btn');
    await user.click(favorite);

    expect(screen.getByText('Favorite Recipes')).toBeInTheDocument();
  });
  test('Testa se ao clicar no botão Logout é redirecionado corretamente', async () => {
    const { user } = renderWithRouter(<App />, { route: '/profile' });

    const logout = screen.getByTestId('profile-logout-btn');
    await user.click(logout);

    expect(screen.getByTestId('login-submit-btn')).toBeInTheDocument();
  });
});
