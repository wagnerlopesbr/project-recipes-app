import { useContext } from 'react';
import RecipiesContext from '../context/RecipiesContext';
import RecipeCard from './RecipeCard';
import { DrinkType, MealType } from '../Type/type';

type RenderRecipesProps = {
  listLength: number;
};

function RenderRecipes({ listLength }: RenderRecipesProps) {
  const { renderRecipes } = useContext(RecipiesContext);

  return (
    <div>
      <ul>
        {renderRecipes?.slice(0, listLength)
          .map((recipe: DrinkType | MealType, index) => (
            <li key={ index }>
              <RecipeCard cardIndex={ index } recipe={ recipe } />
            </li>
          ))}
      </ul>
    </div>
  );
}
export default RenderRecipes;
