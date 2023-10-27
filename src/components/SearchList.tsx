import React, { useContext, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { DrinkType, MealType } from '../Type/type';
import RecipiesContext from '../context/RecipiesContext';
import RecipeCard from './RecipeCard';

type RecipeListProps = {
  listLength: number;
};
function SearchList({ listLength }: RecipeListProps) {
  const { searchBarData } = useContext(RecipiesContext);
  const { recipes } = searchBarData;
  const route = useLocation();
  const [showRecipies, setShowRecipies] = React.useState(false);
  const [currentRoute, setCurrentRoute] = React.useState<'/meals/' | '/drinks/'>(
    '/meals/',
  );

  useEffect(() => {
    if (route.pathname.includes('/meals') && recipes.length > 1) {
      setShowRecipies(true);
      setCurrentRoute('/meals/');
    }
    if (route.pathname.includes('/drinks') && recipes.length > 1) {
      setShowRecipies(true);
      setCurrentRoute('/drinks/');
    }
  }, [recipes.length, route.pathname]);

  return (
    <div>
      {showRecipies && (
        <ul>
          {recipes.slice(0, listLength).map((recipe: DrinkType | MealType, index) => (
            <li key={ index }>
              <Link to={ `${currentRoute}${recipe.idMeal || recipe.idDrink}` }>
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
