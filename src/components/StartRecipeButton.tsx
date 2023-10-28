import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { s } from 'vitest/dist/types-e3c9754d';
import useLocalStorage from '../hooks/useLocalStorage';
import { DoneRecipesLSType, InProgressRecipesType } from '../Type/type';

function StartRecipeButton() {
  const [doneRecipes] = useLocalStorage<DoneRecipesLSType[]>('doneRecipes', []);
  const [inProgressRecipes] = useLocalStorage<InProgressRecipesType>('inProgressRecipes');
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { id } = useParams();

  const isDone = doneRecipes.find((recipe: any) => recipe.id === id);

  const isRecipeInProgress = () => {
    const key = pathname.includes('meals') ? 'meals' : 'drinks';
    const allRecipes = inProgressRecipes[key];
    if (allRecipes && id) {
      const recipe = allRecipes[id];
      if (recipe) return true;
    }
    return false;
  };

  const handleStartRecipeClick = () => {
    const key = pathname.includes('meals') ? 'meals' : 'drinks';
    if (key === 'meals') {
      navigate(`/meals/${id}/in-progress`);
    } else if (key === 'drinks') {
      navigate(`/drinks/${id}/in-progress`);
    }
    /// //////////////////////////////////////
    switch (key) {
      case 'meals': // meals
        navigate(`/meals/${id}/in-progress`);
        break;
      case 'drinks': // drinks
        navigate(`/drinks/${id}/in-progress`);
        break;
      default:
        console.log('GABIGOL, VOLTA A JOGAR BEM PF');
        break;
    }
  };

  return (
    <div>
      {!isDone && (
        <button
          style={ { position: 'fixed', bottom: '0px' } }
          data-testid="start-recipe-btn"
          onClick={ handleStartRecipeClick }
        >
          {isRecipeInProgress() ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </div>
  );
}

export default StartRecipeButton;
