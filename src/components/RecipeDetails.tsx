import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { DrinkType, MealType } from '../Type/type';

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [recipesData, setRecipesData] = useState<DrinkType | MealType>({} as DrinkType | MealType);
  const route = useLocation();

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
  }, [id]);

  if (!recipesData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{ recipesData.strMeal || recipesData.strDrink }</h1>
      <img src={ recipesData.strMealThumb || recipesData.strDrinkThumb } alt="recipe" />
      <p>{ recipesData.strInstructions }</p>
    </div>
  );
};

export default RecipeDetails;
