import { useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ApiReturn, DoneRecipesLSType, DrinkType, MealType } from '../Type/type';
import IngredientList from './ingredients/IngredientList';
import ShareButton from './buttons/ShareButton';
import FavoriteButton from './buttons/FavoriteButton';
import FinishButton from './buttons/FinishButton';
import useFetch from '../hooks/useFetch';
import RecipiesContext from '../context/RecipiesContext';
import useLocalStorage from '../hooks/useLocalStorage';

function RecipeInProgress() {
  const { recipes } = useContext(RecipiesContext);
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();
  const [doneRecipes, setDoneRecipes] = useLocalStorage<DoneRecipesLSType[]>(
    'doneRecipes',
    [],
  );

  const key = pathname.includes('drinks') ? 'drinks' : 'meals';
  const dbUrl = pathname.includes('drinks') ? 'thecocktaildb' : 'themealdb';
  const url = `https://www.${dbUrl}.com/api/json/v1/1/lookup.php?i=${id}`;

  const storedIngredients = id ? recipes[key][id] : [];
  const { data, isLoading } = useFetch<ApiReturn>(url);
  const recipeData = data ? data[key][0] : {} as DrinkType | MealType;

  const ingredients = Object.keys(recipeData)
    .filter((product) => product.includes('strIngredient') && recipeData[product])
    .map((ingredient) => recipeData[ingredient]);

  const setToDoneRecipes = () => {
    setDoneRecipes([
      ...doneRecipes,
      {
        id: recipeData.idMeal || recipeData.idDrink,
        type: key === 'meals' ? 'meal' : 'drink',
        nationality: recipeData.strArea || '',
        category: recipeData.strCategory,
        alcoholicOrNot: recipeData.strAlcoholic || '',
        name: recipeData.strMeal || recipeData.strDrink,
        image: recipeData.strMealThumb || recipeData.strDrinkThumb,
        doneDate: new Date(),
        tags: recipeData.strTags ? recipeData.strTags.split(',') : [],
      },
    ]);
  };

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <>
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
      <ShareButton
        id={ recipeData.idMeal || recipeData.idDrink }
        keyStr={ key }
        testid="share-btn"
      />
      <FavoriteButton favorites={ recipeData } />
      <FinishButton
        ingredients={ ingredients }
        storedIngredients={ storedIngredients }
        setToDoneRecipes={ setToDoneRecipes }
      />
    </>
  );
}

export default RecipeInProgress;
