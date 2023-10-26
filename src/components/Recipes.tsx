import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchAPI } from '../Helpers/FetchAPI';
import RecipiesContext from '../context/RecipiesContext';
import SearchList from './SearchList';
import CategoryFilter from './CategoryFilter';

function Recipes() {
  const [categoriesList, setCategoriesList] = useState<string[]>();

  const { searchBarData } = useContext(RecipiesContext);

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
      searchBarData.setRecipies(Object.values(recipesData));

      const categories = await fetchAPI(endpoints.categories);
      setCategoriesList(Object.values(categories));
    };

    fetchRecipes();
  }, []);

  return (
    <section>
      <CategoryFilter foodOrBeverage="food" />
      <SearchList listLength={ 12 } />
    </section>
  );
}

export default Recipes;
