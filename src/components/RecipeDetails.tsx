import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { DrinkType, MealType } from '../Type/type';
import IngredientList from './IngredientList';
import ShareButton from './ShareButton';
import RecipiesContext from '../context/RecipiesContext';

function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const [recipesData, setRecipesData] = useState<DrinkType | MealType>(
    {} as DrinkType | MealType,
  );
  const route = useLocation();
  const { recomendation } = useContext(RecipiesContext);
  const { setMealsRecomendation } = recomendation.drinks;
  const { setDrinksRecomendation } = recomendation.meals;
  
  useEffect(() => {
    const dbUrl = route.pathname.includes('drinks') ? 'thecocktaildb' : 'themealdb';
    const key = route.pathname.includes('drinks') ? 'drinks' : 'meals';
    // fazendo a requisição para as 2 APIs dependendo da rota
    try {
      fetch(`https://www.${dbUrl}.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => setRecipesData(data[key][0]));
    } catch (error) {
      console.error(error);
    }
  }, [id, route.pathname]);

  useEffect(() => {
    if (route.pathname.includes('drinks')) {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((data) => {
          if (data.drinks && data.drinks.length > 0) {
            setMealsRecomendation(data.drinks);
          }
        })
    }
  }, []);

  useEffect(() => {
    if (route.pathname.includes('meals')) {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((data) => {
          if (data.meals && data.meals.length > 0) {
            setDrinksRecomendation(data.meals);
          }
        })
    }
  }, []);



  if (!recipesData) return <div>Loading...</div>;

  return (
    <div>
      <h1 data-testid="recipe-title">
        { recipesData.strMeal || recipesData.strDrink }
      </h1>
      <img
        data-testid="recipe-photo"
        src={ recipesData.strMealThumb || recipesData.strDrinkThumb }
        alt="recipe"
      />
      {/* se houver category (meals), renderiza um parágrafo com a info */}
      {recipesData.strCategory && (
        <p data-testid="recipe-category">
          { recipesData.strCategory }
        </p>
      )}
      {/* se for alcólico (drink), renderiza um parágrafo com a info */}
      {recipesData.strAlcoholic && (
        <p data-testid="recipe-category">
          { recipesData.strAlcoholic }
        </p>
      )}
      {/* componente para fazer o .map dos ingredientes do produto */}
      <IngredientList recipesData={ recipesData } />
      <p data-testid="instructions">
        { recipesData.strInstructions }
      </p>
      {/* se for meals, haverá info de video, que será renderizado */}
      {route.pathname.includes('meals') && recipesData.strYoutube && (
        <iframe
          data-testid="video"
          width="560"
          height="315"
          src={ `https://www.youtube.com/embed/${recipesData.strYoutube.split('=')[1]}` }
          title="YouTube video player"
          allowFullScreen
        />
      )}
      <ShareButton />
    </div>
  );
}

export default RecipeDetails;
