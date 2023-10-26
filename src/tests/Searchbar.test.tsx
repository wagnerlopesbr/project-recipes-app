import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';

import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

const mealSearchUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=rice';
const drinkSearchUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin';

const SEARCH_TOP_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const EXEC_SEARCH_BTN = 'exec-search-btn';
const NAME_SEARCH_RADIO = 'name-search-radio';
const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';

describe('Testes para search bar', () => {
  test('Verifica se os itens da searchBar estão presentes na tela', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchBtn).toBeInTheDocument();
    await user.click(searchBtn);

    expect(screen.getByTestId(SEARCH_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(EXEC_SEARCH_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(NAME_SEARCH_RADIO)).toBeInTheDocument();
    expect(screen.getByTestId(INGREDIENT_SEARCH_RADIO)).toBeInTheDocument();
  });

  test('Verifica api eh chamada na url correta para meals', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const fetch = vi.spyOn(global, 'fetch');

    const searchHeaderBtn = screen.getByTestId(SEARCH_TOP_BTN);
    await user.click(searchHeaderBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);
    const ingredientRadio = screen.getByTestId(INGREDIENT_SEARCH_RADIO);

    await user.click(ingredientRadio);
    await user.type(searchInput, 'rice');
    await user.click(searchButton);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(mealSearchUrl);
  });

  test('Verifica api eh chamada na url correta para drinks', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks' });
    const fetch = vi.spyOn(global, 'fetch');

    const searchHeaderBtn = screen.getByTestId(SEARCH_TOP_BTN);
    await user.click(searchHeaderBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);
    const ingredientRadio = screen.getByTestId(INGREDIENT_SEARCH_RADIO);

    await user.click(ingredientRadio);
    await user.type(searchInput, 'Gin');
    await user.click(searchButton);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(drinkSearchUrl);
  });

  test('Verifica se a pesquisa por 1 letra aciona um alert se não for por 1 letra', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks' });

    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
    await user.click(searchIcon);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    const alertMsg = vi.spyOn(window, 'alert');

    await user.type(searchInput, 'Mais que uma letra');
    await user.click(firstLetterRadio);
    await user.click(searchBtn);

    expect(alertMsg).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });

  test('Verifica se ao receber somente um item ao pesquisar na página Meals, é redirecionado para a página de detalhes do item', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
    await user.click(searchIcon);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const nameRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    await user.type(searchInput, 'Arrabiata');
    await user.click(nameRadio);
    await user.click(searchBtn);

    waitFor(() => {
      expect(window.location.pathname).toBe('/meals/52771');
    });

    const title = await screen.findByText('Spicy Arrabiata Penne');

    expect(title).toBeInTheDocument();
  });

  test('Verifica se ao receber somente um item ao pesquisar na página Drinks, é redirecionado para a página de detalhes do item', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks' });

    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
    await user.click(searchIcon);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const nameRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    await user.type(searchInput, 'Aquamarine');
    await user.click(nameRadio);
    await user.click(searchBtn);

    waitFor(() => {
      expect(window.location.pathname).toBe('http://localhost:3000/drinks/178319');
    });

    const title = await screen.findByText('Aquamarine');

    expect(title).toBeInTheDocument();
  });

  test('Verifica se caso não tenham receitas que correspondem a pesquisa dispara um alert', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks' });

    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
    await user.click(searchIcon);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const nameRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    const alertMsg = vi.spyOn(window, 'alert');

    await user.type(searchInput, 'Xablau');
    await user.click(nameRadio);
    await user.click(searchBtn);

    waitFor(() => {
      expect(alertMsg).toHaveBeenCalledWith("Sorry, we haven't found any recipes for these filters.");
    });
  });
});
