import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchAPI } from '../Helpers/FetchAPI';
import RecipiesContext from '../context/RecipiesContext';
import CategoryFilter from './filters/CategoryFilter';
import RenderRecipes from './RenderRecipes';
import SearchList from './SearchList';

function Recipes() {
  const [categoriesList, setCategoriesList] = useState<string[]>();
  const { renderRecipes, updateRecipesList } = useContext(RecipiesContext);
  const [showRecipes, setShowRecipes] = React.useState(false);

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
  }, [endpoints.categories, endpoints.initialList, updateRecipesList]);

  return (
    <section>
      <CategoryFilter foodOrBeverage={ pathname } />
      <RenderRecipes
        listLength={ 12 }
        setShowRecipes={ setShowRecipes }
        showRecipes={ showRecipes }
      />
      <SearchList
        listLength={ 12 }
        setShowRecipes={ setShowRecipes }
        showRecipes={ showRecipes }
      />
    </section>
  );
}

export default Recipes;
