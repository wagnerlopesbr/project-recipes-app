import { useNavigate } from 'react-router-dom';
import { DoneRecipesLSType } from '../Type/type';
import ShareButton from '../components/ShareButton';
import Tags from '../components/Tags';
import TypeFilter from '../components/filters/TypeFilter';
import useLocalStorage from '../hooks/useLocalStorage';

function DoneRecipes() {
  const [doneRecipes] = useLocalStorage<DoneRecipesLSType[]>('doneRecipes', []);
  const navigate = useNavigate();

  return (
    <div>
      <TypeFilter />
      {
        doneRecipes.map((recipe, index) => (
          <div key={ recipe.id }>
            <button
              onClick={ () => navigate(`/${recipe.type}s/${recipe.id}`) }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt="foto da receita"
              />
            </button>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'drink'
                ? `${recipe.alcoholicOrNot} - ${recipe.category}`
                : `${recipe.nationality} - ${recipe.category}`}
            </p>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              {recipe.doneDate.toString()}
            </p>
            <ShareButton
              id={ recipe.id }
              keyStr={ `${recipe.type}s` }
              testid={ `${index}-horizontal-share-btn` }
            />
            <Tags index={ index } tagList={ recipe.tags } />
          </div>
        ))
      }
    </div>
  );
}

export default DoneRecipes;
