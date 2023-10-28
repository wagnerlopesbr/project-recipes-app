import useLocalStorage from '../hooks/useLocalStorage';
import { DoneRecipesLSType, InProgressRecipesType } from '../Type/type';

type PropType = {
  path: 'drinks' | 'meals';
  recipeId: string;
  // recipeType: 'meal' | 'drink';
};

function StartRecipeButton({ path, recipeId }: PropType) {
  const [doneRecipes] = useLocalStorage<DoneRecipesLSType[]>('doneRecipes', []);
  const [inProgress] = useLocalStorage<InProgressRecipesType>('inProgressRecipes');

  const isDone = doneRecipes.find((recipe: any) => (
    recipe.id === recipeId
  ));

  const inProgressRecipes = path === 'meals' ? inProgress.meals : inProgress.drinks;
  const isProgress = inProgressRecipes[recipeId];

  return (
    <div>
      {!isDone && (
        <button
          style={ { position: 'fixed', bottom: '0px' } }
          data-testid="start-recipe-btn"
        // onClick={ handleStartRecipeClick }
        >
          {isProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </div>
  );
}

export default StartRecipeButton;
