import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from '../components/SearchBar';

function Header() {
  const route = useLocation();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const showSearchIcon = !route.pathname.includes('profile')
    && !route.pathname.includes('done-recipes')
    && !route.pathname.includes('favorite-recipes');

  const pageTitle = () => {
    if (route.pathname.includes('meals')) {
      return 'Meals';
    } if (route.pathname.includes('drinks')) {
      return 'Drinks';
    } if (route.pathname.includes('profile')) {
      return 'Profile';
    } if (route.pathname.includes('done-recipes')) {
      return 'Done Recipes';
    } if (route.pathname.includes('favorite-recipes')) {
      return 'Favorite Recipes';
    }
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <>
      <header>
        <div>
          <Link to="/profile">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="Ícone de Perfil"
            />
          </Link>
        </div>
        <h1 data-testid="page-title">
          {pageTitle()}
        </h1>
        {showSearchIcon && (
          <div>
            <button onClick={ toggleSearchBar }>
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="Ícone de Pesquisa"
              />
            </button>
            {showSearchBar && (
              <SearchBar />
            )}
          </div>
        )}
      </header>
      <Outlet />
    </>
  );
}

export default Header;
