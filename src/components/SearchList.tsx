import React, { useContext, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { DrinkType, MealType } from '../Type/type';
import RecipiesContext from '../context/RecipiesContext';
import RecipeCard from './RecipeCard';

type RecipeListProps = {
  listLength: number;
  showRecipes: boolean;
  setShowRecipes: React.Dispatch<React.SetStateAction<boolean>>;
};

function SearchList({ listLength, setShowRecipes, showRecipes }: RecipeListProps) {
  const { searchBarData } = useContext(RecipiesContext);
  const { recipes } = searchBarData;
  const route = useLocation();

  useEffect(() => {
    if (route.pathname.includes('/meals') && recipes.length > 1) {
      setShowRecipes(true);
    }
    if (route.pathname.includes('/drinks') && recipes.length > 1) {
      setShowRecipes(true);
    }
  }, [recipes.length, route.pathname, setShowRecipes]);

  return (
    <div>
      {showRecipes && (
        <ul>
          {recipes.slice(0, listLength).map((recipe: DrinkType | MealType, index) => (
            <li key={ index }>
              <Link to={ `${route.pathname}${recipe.idMeal || recipe.idDrink}` }>
                <RecipeCard cardIndex={ index } recipe={ recipe } />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchList;
