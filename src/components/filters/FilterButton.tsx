import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchAPI } from '../../Helpers/FetchAPI';
import RecipiesContext from '../../context/RecipiesContext';
import { DrinkType, MealType } from '../../Type/type';
import { addToCache, getFromCache } from '../../hooks/useFetch';

type ButtonProps = {
  buttonInfo: {
    categoryName: string,
    initialList: string,
  }
};

function FilterButton({ buttonInfo: { categoryName, initialList } }: ButtonProps) {
  const { updateRecipesList } = useContext(RecipiesContext);

  const [toggle, setToggle] = useState<boolean>(false);

  const { pathname } = useLocation();

  const handleClick = async () => {
    const apiURL = pathname === '/drinks' ? 'thecocktaildb' : 'themealdb';
    const url = `https://www.${apiURL}.com/api/json/v1/1/filter.php?c=${categoryName}`;
    if (!toggle) {
      const cachedData = getFromCache<DrinkType[] | MealType[]>(url);
      if (cachedData) {
        updateRecipesList(cachedData);
      } else {
        const recipesData = await fetchAPI(url);
        const recipes = Object.values(recipesData)[0] as DrinkType[] | MealType[];
        updateRecipesList(recipes);
        addToCache(url, recipes);
      }
    } else {
      const cachedData = getFromCache<DrinkType[] | MealType[]>(initialList);
      if (cachedData) {
        updateRecipesList(cachedData);
      } else {
        const recipesData = await fetchAPI(initialList);
        const recipes = Object.values(recipesData)[0] as DrinkType[] | MealType[];
        updateRecipesList(recipes);
        addToCache(initialList, recipes);
      }
    }
    setToggle(!toggle);
  };

  return (
    <button
      onClick={ handleClick }
      key={ categoryName }
      data-testid={ `${categoryName}-category-filter` }
    >
      {categoryName}

    </button>
  );
}

export default FilterButton;
