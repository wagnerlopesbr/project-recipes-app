import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { DoneRecipesLSType, InProgressRecipesType } from '../Type/type';
import { initInProgress } from '../Helpers/helpers';

function StartRecipeButton() {
  const [doneRecipes] = useLocalStorage<DoneRecipesLSType[]>('doneRecipes', []);
  const [inProgressRecipes, setRecipes] = useLocalStorage<InProgressRecipesType>(
    'inProgressRecipes',
    initInProgress,
  );
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { id } = useParams();
  const key = pathname.includes('meals') ? 'meals' : 'drinks';

  const isDone = doneRecipes.find((recipe: any) => recipe.id === id);

  const startStorage = () => {
    const storageIngredients = id ? inProgressRecipes[key][id] : [];
    if (!storageIngredients && id) {
      setRecipes({ ...inProgressRecipes, [key]: { [id]: [] } });
    }
  };

  const isRecipeInProgress = () => {
    const allRecipes = inProgressRecipes[key];
    if (allRecipes && id) {
      const recipe = allRecipes[id];
      if (recipe) return true;
    }
    return false;
  };

  const handleStartRecipeClick = () => {
    switch (key) {
      case 'meals':
        startStorage();
        navigate(`/meals/${id}/in-progress`);
        break;
      case 'drinks':
        startStorage();
        navigate(`/drinks/${id}/in-progress`);
        break;
      default:
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
