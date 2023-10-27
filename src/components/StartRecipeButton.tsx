import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { DoneRecipesLSType, inProgressRecipesType} from '../Type/type';

type PropType = {
  page?: string;
  recipeId?: string | undefined;
  recipeType?: 'meal' | 'drink';
};

function StartRecipeButton({ page, recipeId, recipeType }: PropType) {
  const [doneRecipes, setDoneRecipes] = useLocalStorage<DoneRecipesLSType[]>('doneRecipes', []);
  const [inProgress, setInProgress] = useLocalStorage<inProgressRecipesType[]>('inProgressRecipes', []);

  doneRecipes.find((recipe: any) => (
    recipe.id === recipeId
  ));

  inProgress.find((recipe: any) => (
    recipe.id === recipeId
  ));

  return (
    <div>
      {doneRecipes && (
        <button
        style={ { position: 'fixed', bottom: '0px' } }
        data-testid="start-recipe-btn"
        // onClick={ handleStartRecipeClick }
      >
        {!inProgress ? 'Continue Recipe' : 'Start Recipe'}
      </button>
      )}
    </div>
  );
}

export default StartRecipeButton;
