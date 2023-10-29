import userEvent from '@testing-library/user-event';
import { act, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { doneRecipes } from './mocks/doneRecipes';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

const doneRecipesPath = '/done-recipes';

describe('Recipes in progress page tests', () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem')
      .mockReturnValue(JSON.stringify(doneRecipes));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Test if meal filter is working properyly', async () => {
    await act(async () => {
      renderWithRouter(<App />, { route: doneRecipesPath });
    });

    const firstItemName = screen.queryByTestId('0-horizontal-top-text');
    expect(firstItemName).toHaveTextContent('Italian - Vegetarian');
    const secondItemName = screen.queryByTestId('1-horizontal-top-text');
    expect(secondItemName).toHaveTextContent('Alcoholic - Cocktail');

    const mealButton = screen.getByTestId('filter-by-meal-btn');
    await userEvent.click(mealButton);

    expect(secondItemName).not.toBeInTheDocument();
    vi.clearAllMocks();
  });

  test('Test if drink filter is working properyly', async () => {
    await act(async () => {
      renderWithRouter(<App />, { route: doneRecipesPath });
    });

    const firstItemName = screen.queryByTestId('0-horizontal-top-text');
    expect(firstItemName).toHaveTextContent('Italian - Vegetarian');
    const secondItemName = screen.queryByTestId('1-horizontal-top-text');
    expect(secondItemName).toHaveTextContent('Alcoholic - Cocktail');

    const mealButton = screen.getByTestId('filter-by-drink-btn');
    await userEvent.click(mealButton);

    expect(firstItemName).not.toBeInTheDocument();
    vi.clearAllMocks();
  });

  test('Test if clicking in the picture redirects to new page', async () => {
    await act(async () => {
      renderWithRouter(<App />, { route: doneRecipesPath });
    });

    const firstItemImage = screen.getByTestId('0-horizontal-image');
    await userEvent.click(firstItemImage);

    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify({ meals: {}, drinks: {} }));

    waitFor(() => {
      expect(window.location.pathname).toBe('/meals/52771');
    });
  });

  test('Test if clicking in the name redirects to new page', async () => {
    await act(async () => {
      renderWithRouter(<App />, { route: doneRecipesPath });
    });

    const firstItemImage = screen.getByTestId('0-horizontal-name');
    await userEvent.click(firstItemImage);

    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify({ meals: {}, drinks: {} }));

    waitFor(() => {
      expect(window.location.pathname).toBe('/meals/52771');
    });
  });
});
