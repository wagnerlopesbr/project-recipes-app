import React, { useContext } from 'react';
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

  return (
    <div>
      <ul>
        {renderRecipes?.slice(0, listLength)
          .map((recipe: DrinkType | MealType, index) => (
            <li key={ index }>
              <Link to={ `${route.pathname}/${recipe.idMeal || recipe.idDrink}` }>
                <RecipeCard cardIndex={ index } recipe={ recipe } />
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default RenderRecipes;
