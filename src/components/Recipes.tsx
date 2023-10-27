import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchAPI } from '../Helpers/FetchAPI';
import RecipiesContext from '../context/RecipiesContext';
import CategoryFilter from './filters/CategoryFilter';
import RenderRecipes from './RenderRecipes';

function Recipes() {
  const { updateRecipesList } = useContext(RecipiesContext);

  const { pathname } = useLocation();

  const apiURL = pathname === '/drinks' ? 'thecocktaildb' : 'themealdb';

  const endpoints = {
    initialList: `https://www.${apiURL}.com/api/json/v1/1/search.php?s=`,
    categories: `https://www.${apiURL}.com/api/json/v1/1/list.php?c=list`,
  };

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
