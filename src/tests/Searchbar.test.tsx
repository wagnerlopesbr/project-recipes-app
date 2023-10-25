import { vi } from 'vitest';
import { screen } from '@testing-library/react';

import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

const mealSearchUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=rice';
const drinkSearchUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin';

describe('Testes para search bar', () => {
  test('Verifica api eh chamada na url correta para meals', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const fetch = vi.spyOn(global, 'fetch');

    const searchHeaderBtn = screen.getByTestId('search-top-btn');
    await user.click(searchHeaderBtn);

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('exec-search-btn');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');

    await user.click(ingredientRadio);
    await user.type(searchInput, 'rice');
    await user.click(searchButton);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(mealSearchUrl);
  });

  test('Verifica api eh chamada na url correta para drinks', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks' });
    const fetch = vi.spyOn(global, 'fetch');

    const searchHeaderBtn = screen.getByTestId('search-top-btn');
    await user.click(searchHeaderBtn);

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('exec-search-btn');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');

    await user.click(ingredientRadio);
    await user.type(searchInput, 'Gin');
    await user.click(searchButton);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(drinkSearchUrl);
  });
});
