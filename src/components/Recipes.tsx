import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchAPI } from '../Helpers/FetchAPI';
import RecipiesContext from '../context/RecipiesContext';
import CategoryFilter from './filters/CategoryFilter';
import RenderRecipes from './RenderRecipes';

function Recipes() {
  const { updateRecipesList } = useContext(RecipiesContext);

  const { pathname } = useLocation();

  const endpoints = {
    initialList: '',
    categories: '',
  };

  switch (pathname) {
    case '/drinks': {
      endpoints.initialList = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      endpoints.categories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      break;
    }
    default: {
      endpoints.initialList = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      endpoints.categories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    }
  }

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipesData = await fetchAPI(endpoints.initialList);
      updateRecipesList(Object.values(recipesData)[0]);
    };

    fetchRecipes();
  }, []);

  return (
    <section>
      <CategoryFilter endpoints={ endpoints } />
      <RenderRecipes listLength={ 12 } />
    </section>
  );
}

export default Recipes;
