import { vi } from 'vitest';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';
import favoriteRecipes from './mocks/favoriteRecipes';

const favoriteRecipesPath = '/favorite-recipes';
const firstNameId = '0-horizontal-top-text';
const firstItemString = 'Italian - Vegetarian';

describe('Tests related to favorite recipes page', () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem')
      .mockReturnValue(JSON.stringify(favoriteRecipes));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Test if meal filter is working properyly', async () => {
    await act(async () => {
      renderWithRouter(<App />, { route: favoriteRecipesPath });
    });

    const firstItemName = screen.queryByTestId(firstNameId);
    expect(firstItemName).toHaveTextContent(firstItemString);
    const secondItemName = screen.queryByTestId('1-horizontal-top-text');
    expect(secondItemName).toHaveTextContent('Alcoholic - Cocktail');

    const mealButton = screen.getByTestId('filter-by-meal-btn');
    await userEvent.click(mealButton);

    expect(secondItemName).not.toBeInTheDocument();
    vi.clearAllMocks();
  });

  test('Test if drink filter is working properyly', async () => {
    await act(async () => {
      renderWithRouter(<App />, { route: favoriteRecipesPath });
    });

    const firstItemName = screen.queryByTestId(firstNameId);
    expect(firstItemName).toHaveTextContent(firstItemString);
    const secondItemName = screen.queryByTestId('1-horizontal-top-text');
    expect(secondItemName).toHaveTextContent('Alcoholic - Cocktail');

    const mealButton = screen.getByTestId('filter-by-drink-btn');
    await userEvent.click(mealButton);

    expect(firstItemName).not.toBeInTheDocument();
    vi.clearAllMocks();
  });

  test('Test if clicking in the picture redirects to new page', async () => {
    await act(async () => {
      renderWithRouter(<App />, { route: favoriteRecipesPath });
    });

    const firstItemImage = screen.getByTestId('0-horizontal-image');
    await userEvent.click(firstItemImage);

    waitFor(() => {
      expect(window.location.pathname).toBe('/meals/52771');
    });
  });

  test('Test if clicking in the name redirects to new page', async () => {
    await act(async () => {
      renderWithRouter(<App />, { route: favoriteRecipesPath });
    });

    const firstItemImage = screen.getByTestId('0-horizontal-name');
    await userEvent.click(firstItemImage);

    waitFor(() => {
      expect(window.location.pathname).toBe('/meals/52771');
    });
  });

  test('Test if unfavorite button works', async () => {
    await act(async () => {
      renderWithRouter(<App />, { route: favoriteRecipesPath });
    });

    const firstItemName = screen.queryByTestId(firstNameId);
    expect(firstItemName).toHaveTextContent(firstItemString);

    const unfavoriteButton = screen.getByTestId('0-horizontal-favorite-btn');
    await userEvent.click(unfavoriteButton);

    expect(firstItemName).not.toBeInTheDocument();
    vi.clearAllMocks();
  });
});
