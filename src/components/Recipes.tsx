import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchAPI } from '../Helpers/FetchAPI';
import RecipiesContext from '../context/RecipiesContext';
import CategoryFilter from './filters/CategoryFilter';
import RenderRecipes from './RenderRecipes';
import { DrinkType, MealType } from '../Type/type';
import { addToCache, getFromCache } from '../hooks/useFetch';

function Recipes() {
  const {
    updateRecipesList,
    loading,
    updateLoading,
  } = useContext(RecipiesContext);

  const { pathname } = useLocation();

  const apiURL = pathname === '/drinks' ? 'thecocktaildb' : 'themealdb';

  const endpoints = {
    initialList: `https://www.${apiURL}.com/api/json/v1/1/search.php?s=`,
    categories: `https://www.${apiURL}.com/api/json/v1/1/list.php?c=list`,
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      const cachedData = getFromCache<DrinkType[] | MealType[]>(endpoints.initialList);
      if (cachedData) {
        updateRecipesList(cachedData);
        return;
      }
      updateLoading(true);
      const recipesData = await fetchAPI(endpoints.initialList);
      const recipes = Object.values(recipesData)[0] as DrinkType[] | MealType[];
      updateRecipesList(recipes);
      addToCache(endpoints.initialList, recipes);
      updateLoading(false);
    };

    fetchRecipes();
  }, [endpoints.initialList]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <section>
      <CategoryFilter endpoints={ endpoints } />
      <RenderRecipes listLength={ 12 } />
    </section>
  );
}

export default Recipes;
