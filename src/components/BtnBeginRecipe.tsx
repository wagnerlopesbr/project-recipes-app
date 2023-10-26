import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DoneRecipesLocal } from '../Type/type';

type PropType = {
  page: string;
  recipeId: string | undefined;
};

function BtnBeginRecipe({ page, recipeId }: PropType) {
  const [recipesList, setRecipeList] = useState([] as DoneRecipesLocal[]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const storageDoneRecipes: DoneRecipesLocal[] = JSON
  //     .parse(localStorage.getItem('doneRecipes') || 'null') ?? '[]';
  //   setRecipeList(storageDoneRecipes);
  // }, []);

  const isRecipeInProgress = () => {
    if (!recipeId) {
      return false;
    }

    //   const localStorageIngredients = localStorage.getItem('inProgressRecipes');
    //   if (localStorageIngredients) {
    //     const inProgressRecipes = JSON.parse(localStorageIngredients);
    //     return inProgressRecipes.meals?.[recipeId] || inProgressRecipes.drinks?.[recipeId];
    //   }

  //   return false;
  };

  const handleStartRecipeClick = () => {
    if (isRecipeInProgress()) {
      if (page === 'Meal') {
        navigate(`/meals/${recipeId}/in-progress`);
      } else if (page === 'Drink') {
        navigate(`/drinks/${recipeId}/in-progress`);
      }
    } else if (page === 'Meal') {
      navigate(`/meals/${recipeId}/in-progress`);
    } else if (page === 'Drink') {
      navigate(`/drinks/${recipeId}/in-progress`);
    }
  };

  if (recipesList.length === 0) return null;

  return (
    <button
      style={ { position: 'fixed', bottom: '0px' } }
      data-testid="start-recipe-btn"
      onClick={ handleStartRecipeClick }
    >
      {isRecipeInProgress() ? 'Continue Recipe' : 'Start Recipe'}
    </button>
  );
}

export default BtnBeginRecipe;
