import { screen, waitFor } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

describe('Testanto o Favorite Button funciona corretamente', () => {
  test('Testa se o ícone do coração muda', async () => {
    const { user } = renderWithRouter(<App />, { route: 'http://localhost:3000/meals/52977' });

    waitFor(async () => {
      const favoriteBtn = screen.getByTestId('favorite-btn');
      expect(favoriteBtn).toHaveProperty('alt', 'NotInLove');
      await user.click(favoriteBtn);
      expect(favoriteBtn).toHaveProperty('alt', 'InLove');
    });
  });
});
