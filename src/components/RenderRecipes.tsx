import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RecipiesContext from '../context/RecipiesContext';
import RecipeCard from './RecipeCard';
import { DrinkType, MealType } from '../Type/type';

type RenderRecipesProps = {
  listLength: number;
};

function RenderRecipes({ listLength }: RenderRecipesProps) {
  const { renderRecipes } = useContext(RecipiesContext);
  const route = useLocation();
  const [currentRoute, setCurrentRoute] = React.useState<'/meals/' | '/drinks/'>(
    '/meals/',
  );

  useEffect(() => {
    if (route.pathname.includes('/meals')) {
      setCurrentRoute('/meals/');
    }
    if (route.pathname.includes('/drinks')) {
      setCurrentRoute('/drinks/');
    }
  }, [renderRecipes.length, route.pathname]);

  return (
    <div>
      <ul>
        {renderRecipes?.slice(0, listLength)
          .map((recipe: DrinkType | MealType, index) => (
            <li key={ index }>
              <Link to={ `${currentRoute}${recipe.idMeal || recipe.idDrink}` }>
                <RecipeCard cardIndex={ index } recipe={ recipe } />
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
export default RenderRecipes;
