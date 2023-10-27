import { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchAPI } from '../Helpers/FetchAPI';
import { DrinkType, MealType } from '../Type/type';
import RecipiesContext from '../context/RecipiesContext';
import IngredientList from './ingredients/IngredientList';
import ShareButton from './ShareButton';
import FavoriteButton from './buttons/FavoriteButton';
import FinishButton from './buttons/FinishButton';

function RecipeInProgress() {
  const { loading, updateLoading } = useContext(RecipiesContext);
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();

  const [recipeData, setRecipeData] = useState<DrinkType | MealType>(
    {} as DrinkType | MealType,
  );

  useEffect(() => {
    const apiUrl = pathname.includes('drinks') ? 'thecocktaildb' : 'themealdb';
    const key = pathname.includes('drinks') ? 'drinks' : 'meals';

    const fetchRecipe = async () => {
      updateLoading(true);
      const response = await fetchAPI(`https://www.${apiUrl}.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = response[key][0];
      setRecipeData(data);
      updateLoading(false);
    };

    fetchRecipe();
  }, [id, pathname]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h1 data-testid="recipe-title">
        { recipeData.strMeal || recipeData.strDrink }
      </h1>
      <img
        data-testid="recipe-photo"
        src={ recipeData.strMealThumb || recipeData.strDrinkThumb }
        alt="recipe"
      />
      {/* se houver category (meals), renderiza um parágrafo com a info */}
      {recipeData.strCategory && (
        <p data-testid="recipe-category">
          { recipeData.strCategory }
        </p>
      )}
      {/* se for alcólico (drink), renderiza um parágrafo com a info */}
      {recipeData.strAlcoholic && (
        <p data-testid="recipe-category">
          { recipeData.strAlcoholic }
        </p>
      )}
      {/* componente para fazer o .map dos ingredientes do produto */}
      <IngredientList recipesData={ recipeData } />
      <p data-testid="instructions">
        { recipeData.strInstructions }
      </p>
      {/* se for meals, haverá info de video, que será renderizado */}
      {pathname.includes('meals') && recipeData.strYoutube && (
        <iframe
          data-testid="video"
          width="560"
          height="315"
          src={ `https://www.youtube.com/embed/${recipeData.strYoutube.split('=')[1]}` }
          title="YouTube video player"
          allowFullScreen
        />
      )}
      <ShareButton />
      <FavoriteButton />
      <FinishButton />
    </>
  );
}

export default RecipeInProgress;
