import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DrinkType, MealType } from '../Type/type';
import RecipiesContext from '../context/RecipiesContext';
import RecipeCard from './RecipeCard';

type RecipeListProps = {
  listLength: number;
};

function RecipeList({ listLength }: RecipeListProps) {
  const { searchBarData } = useContext(RecipiesContext);
  const { recipes } = searchBarData;
  const route = useLocation();
  const [showRecipies, setShowRecipies] = React.useState(false);

  useEffect(() => {
    if (route.pathname.includes('/meals') && recipes.length > 1) {
      setShowRecipies(true);
    }
    if (route.pathname.includes('/drinks') && recipes.length > 1) {
      setShowRecipies(true);
    }
  }, [recipes.length, route.pathname]);

  return (
    <div>
      {showRecipies && (
        <ul>
          {recipes.slice(0, listLength).map((recipe: DrinkType | MealType, index) => (
            <li key={ index }>
              <RecipeCard cardIndex={ index } recipe={ recipe } />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecipeList;
