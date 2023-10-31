import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';
import { mockRecipeDetails } from './mocks/mockRecipeDetails';
import oneDrink from './mocks/oneDrinks';

const inProgressRoute = '/meals/52968/in-progress';

describe('Recipes in progress page tests', () => {
  beforeEach(() => {
    const MOCK_RESPONSE = { json: async () => mockRecipeDetails } as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('1 - Test if elements are rendered correctly', async () => {
    await act(async () => {
      renderWithRouter(<App />, { route: inProgressRoute });
    });

    expect(window.location.pathname).toBe(inProgressRoute);

    expect(fetch).toHaveBeenCalledTimes(1);

    screen.getByRole('heading', { name: /mbuzi choma \(roasted goat\)/i });
    screen.getByRole('img', { name: /recipe/i });

    screen.getByRole('checkbox', { name: /goat meat - 1 kg/i });

    screen.getByText(/corn flour - 1 kg/i);
    screen.getByText(/tomatoes - 2/i);
    screen.getByText(/salt - pinch/i);
    screen.getByText(/onion - 1/i);
    screen.getByText(/green chilli - 1/i);

    screen.getByRole('checkbox', { name: /coriander leaves - 1 bunch/i });

    screen.getByTestId('instructions');

    // screen.getByRole('button', { name: /favoritar/i });
    // screen.getByRole('button', { name: /favorite recipe/i });
    screen.getByRole('button', { name: /finish recipe/i });
  });

  test('2 - From the meals page test if user gets redirected to done recipes page when finish button pressed', async () => {
    await act(async () => {
      renderWithRouter(<App />, { route: inProgressRoute });
    });

    expect(window.location.pathname).toBe(inProgressRoute);

    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    const ingredientOne = await screen.findByTestId('0-ingredient-step');
    const ingredientTwo = await screen.findByTestId('1-ingredient-step');
    const ingredientThree = await screen.findByTestId('2-ingredient-step');
    const ingredientFour = await screen.findByTestId('3-ingredient-step');
    const ingredientFive = await screen.findByTestId('4-ingredient-step');
    const ingredientSix = await screen.findByTestId('5-ingredient-step');
    const ingredientSeven = await screen.findByTestId('6-ingredient-step');

    await userEvent.click(ingredientOne);
    await userEvent.click(ingredientTwo);
    await userEvent.click(ingredientThree);
    await userEvent.click(ingredientFour);
    await userEvent.click(ingredientFive);
    await userEvent.click(ingredientSix);
    await userEvent.click(ingredientSeven);

    await userEvent.click(finishBtn);

    await waitFor(async () => {
      expect(window.location.pathname).toBe('/done-recipes');
    });
  });

  test('3 - From the drinks page test if user gets redirected to done recipes page when finish button pressed', async () => {
    vi.clearAllMocks();
    const MOCK_RESPONSE = { json: async () => oneDrink } as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
    await act(async () => {
      renderWithRouter(<App />, { route: '/drinks/178319/in-progress' });
    });

    expect(window.location.pathname).toBe('/drinks/178319/in-progress');

    const ingredientOne = await screen.findByTestId('0-ingredient-step');
    const ingredientTwo = await screen.findByTestId('1-ingredient-step');
    const ingredientThree = await screen.findByTestId('2-ingredient-step');
    const finishBtn = await screen.findByTestId('finish-recipe-btn');

    await userEvent.click(ingredientOne);
    await userEvent.click(ingredientTwo);
    await userEvent.click(ingredientThree);

    await userEvent.click(finishBtn);

    await waitFor(async () => {
      expect(window.location.pathname).toBe('/done-recipes');
    });
  });
});
