import { useLocation, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

import { ApiReturn, DrinkType, MealType } from '../Type/type';

import IngredientList from './ingredients/IngredientList';
import ShareButton from './ShareButton';
import DetailsCarousel from './DetailsCarousel';
import StartRecipeButton from './StartRecipeButton';

function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();

  const key = pathname.includes('drinks') ? 'drinks' : 'meals';
  const dbUrl = pathname.includes('drinks') ? 'thecocktaildb' : 'themealdb';
  const url = `https://www.${dbUrl}.com/api/json/v1/1/lookup.php?i=${id}`;

  const { data, isLoading } = useFetch<ApiReturn>(url);
  const recipeData = data ? data[key][0] : {} as DrinkType | MealType;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 data-testid="recipe-title">
        {recipeData.strMeal || recipeData.strDrink}
      </h1>
      <img
        data-testid="recipe-photo"
        src={ recipeData.strMealThumb || recipeData.strDrinkThumb }
        alt="recipe"
      />
      {/* se houver category (meals), renderiza um parágrafo com a info */}
      {recipeData.strCategory && (
        <p data-testid="recipe-category">
          {recipeData.strCategory}
        </p>
      )}
      {/* se for alcólico (drink), renderiza um parágrafo com a info */}
      {recipeData.strAlcoholic && (
        <p data-testid="recipe-category">
          {recipeData.strAlcoholic}
        </p>
      )}
      {/* componente para fazer o .map dos ingredientes do produto */}
      <IngredientList recipesData={ recipeData } />
      <p data-testid="instructions">
        {recipeData.strInstructions}
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
      <DetailsCarousel />
      <ShareButton />
      <StartRecipeButton />
    </div>
  );
}

export default RecipeDetails;
