import { screen } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

describe('Verificando se o Header funciona corretamente', () => {
  test('Ao clica no botão de perfil é redirecionado para a rota "/profile"', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const profileBtn = screen.getByTestId('profile-top-btn');

    await user.click(profileBtn);

    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  test('Ao clicar no botão de pesquisa a barra de pesquisa e exibida e se clicar novamente ela desaparece', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const searchBtn = screen.getByTestId('search-top-btn');

    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();

    await user.click(searchBtn);

    const searchIpt = await screen.findByTestId('search-input');

    expect(searchIpt).toBeInTheDocument();
  });
});
