import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';
import { mockRecipeDetails } from './mocks/mockRecipeDetails';

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
      renderWithRouter(<App />, { route: '/meals/52968/in-progress' });
    });

    expect(window.location.pathname).toBe('/meals/52968/in-progress');

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

    screen.getByRole('button', { name: /favoritar/i });
    screen.getByRole('button', { name: /favorite recipe/i });
    screen.getByRole('button', { name: /finish recipe/i });
  });
});
