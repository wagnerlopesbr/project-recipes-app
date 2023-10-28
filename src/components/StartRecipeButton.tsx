import useLocalStorage from '../hooks/useLocalStorage';
import { DoneRecipesLSType, InProgressRecipesType } from '../Type/type';

type PropType = {
  path: 'drinks' | 'meals';
  recipeId: string;
  // recipeType: 'meal' | 'drink';
};

function StartRecipeButton({ path, recipeId }: PropType) {
  const [doneRecipes] = useLocalStorage<DoneRecipesLSType[]>('doneRecipes', []);

  const isDone = doneRecipes.find((recipe: any) => (
    recipe.id === recipeId
  ));

  const isRecipeInProgress = () => {
    if (!recipeId) {
      return false;
    }

    const localStorageIngredients = localStorage.getItem('inProgressRecipes');
    if (localStorageIngredients) {
      const inProgressRecipes = JSON.parse(localStorageIngredients);
      return inProgressRecipes.meals?.[recipeId] || inProgressRecipes.drinks?.[recipeId];
    }

    return false;
  };

  return (
    <div>
      {!isDone && (
        <button
          style={ { position: 'fixed', bottom: '0px' } }
          data-testid="start-recipe-btn"
        // onClick={ handleStartRecipeClick }
        >
          {isRecipeInProgress() ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </div>
  );
}

export default StartRecipeButton;
