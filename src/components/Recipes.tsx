import { useEffect, useState } from 'react';
import { fetchAPI } from '../Helpers/FetchAPI';
import RecipeCard from './RecipeCard';

type CategoryProps = {
  foodOrDrinks: string
};

const foodCatEndpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const drinksCatEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

function Recipes({ foodOrDrinks }: CategoryProps) {
  const [recipesList, setRecipesList] = useState<string[]>();
  const [categoriesList, setCategoriesList] = useState<string[]>();

  useEffect(() => {
    const fetchRecipes = async () => {
      switch (foodOrDrinks) {
        case 'food': {
          const foodData = await fetchAPI(foodEndpoint);

          const foodList = foodData.meals.slice(0, 12);
          setRecipesList(foodList);

          const foodCategory = foodData.meals.slice(0, 5)
            .map(({ strCategory }) => strCategory);
          setCategoriesList(foodCategory);

          break; }

        default: {
          const drinksData = await fetchAPI(drinksEndpoint);

          const drinksList = drinksData.meals.slice(0, 12);
          setRecipesList(drinksList);

          const drinksCategory = drinksData.drinks.slice(0, 5)
            .map(({ strCategory }) => strCategory);
          setCategoriesList(drinksCategory); }
      }
    };
    fetchRecipes();
  }, []);

  console.log(recipesList);
  console.log(categoriesList);

  return (
    <p>teste</p>
  );
}

export default Recipes;
