import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RecipiesContext from '../context/RecipiesContext';
import RecipeCard from './RecipeCard';
import { DrinkType, MealType } from '../Type/type';

type RenderRecipesProps = {
  listLength: number;
  showRecipes: boolean;
  setShowRecipes: React.Dispatch<React.SetStateAction<boolean>>;
};

function RenderRecipes({ listLength, setShowRecipes, showRecipes }: RenderRecipesProps) {
  const { renderRecipes } = useContext(RecipiesContext);
  const route = useLocation();

  useEffect(() => {
    if (route.pathname.includes('/meals')) {
      setShowRecipes(false);
    }
    if (route.pathname.includes('/drinks')) {
      setShowRecipes(false);
    }
  }, [route.pathname, setShowRecipes]);

  return (
    <div>
      {showRecipes === false && (
        <ul>
          {renderRecipes?.slice(0, listLength)
            .map((recipe: DrinkType | MealType, index) => (
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
export default RenderRecipes;
