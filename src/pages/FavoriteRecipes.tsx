import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FavoritesType } from '../Type/type';
import ShareButton from '../components/buttons/ShareButton';
import TypeFilter from '../components/filters/TypeFilter';
import useLocalStorage from '../hooks/useLocalStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [filter, setFilter] = useState('all');
  const [favoriteRecipes, setFavoriteRecipes] = useLocalStorage<FavoritesType[]>(
    'favoriteRecipes',
    [],
  );
  const navigate = useNavigate();

  const filteredRecipes = favoriteRecipes.filter((recipe) => {
    switch (filter) {
      case 'meal':
        return recipe.type === 'meal';
      case 'drink':
        return recipe.type === 'drink';
      default:
        return true;
    }
  });

  const removeItem = (recipeId: string) => {
    setFavoriteRecipes(favoriteRecipes.filter((item) => item.id !== recipeId));
  };

  return (
    <div>
      <TypeFilter setFilter={ setFilter } />
      {
        filteredRecipes.map((recipe, index) => (
          <div key={ recipe.id }>
            <button
              onClick={ () => navigate(`/${recipe.type}s/${recipe.id}`) }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt="foto da receita"
                height={ 400 }
              />
            </button>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'drink'
                ? `${recipe.alcoholicOrNot} - ${recipe.category}`
                : `${recipe.nationality} - ${recipe.category}`}
            </p>
            <button
              onClick={ () => navigate(`/${recipe.type}s/${recipe.id}`) }
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name}
            </button>
            <button onClick={ () => removeItem(recipe.id) }>
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="InLove"
              />
            </button>
            <ShareButton
              id={ recipe.id }
              keyStr={ `${recipe.type}s` }
              testid={ `${index}-horizontal-share-btn` }
            />
          </div>
        ))
      }
    </div>
  );
}

export default FavoriteRecipes;
