import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { fetchAPI } from '../Helpers/FetchAPI';
import { DRINKS_LINK, MEALS_LINK } from '../Helpers/Links';
import { DrinkType, MealType } from '../Type/type';

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export interface Favorites {
  id: string | undefined;
  type: string;
  nationality: string | undefined;
  category: string | undefined;
  alcoholicOrNot: string | undefined;
  name:string | undefined;
  image: string | undefined;
}

type RecipeContextType = {
  mealResults: Meal[];
  drinkResults: Drink[];
  setMealResults: React.Dispatch<React.SetStateAction<Meal[]>>;
  setDrinkResults: React.Dispatch<React.SetStateAction<Drink[]>>;
  updateMealState: (newState: Meal[]) => void;
  updateDrinkState: (newState: Drink[]) => void;
  fetchMeals: () => void;
  fetchDrinks: () => void;
  favoriteRecipes: Favorites[];
  setFavoriteRecipes: React.Dispatch<React.SetStateAction<Favorites[]>>;
};

const RecipeContext = createContext<RecipeContextType>({
  mealResults: [],
  drinkResults: [],
  setMealResults: () => {},
  setDrinkResults: () => {},
  updateMealState: () => {},
  updateDrinkState: () => {},
  fetchMeals: () => {},
  fetchDrinks: () => {},
  favoriteRecipes: [],
  setFavoriteRecipes: () => {},
});

export function useRecipeContext() {
  return useContext(RecipeContext);
}

type RecipeProviderProps = {
  children: ReactNode;
};

export function RecipeProvider({ children }: RecipeProviderProps) {
  const [mealResults, setMealResults] = useState<Meal[]>([]);
  const [drinkResults, setDrinkResults] = useState<Drink[]>([]);
  const [mealRecipe, setMealRecipe] = useState<MealType>();
  const [drinkRecipe, setDrinkRecipe] = useState<DrinkType>();
  const [favoriteRecipes, setFavoriteRecipes] = useState<Favorites[]>([]);

  const fetchMeals = async () => {
    const response = await fetchAPI(MEALS_LINK);
    setMealResults(response.meals);
  };
  const fetchDrinks = async () => {
    const response = await fetchAPI(DRINKS_LINK);
    setDrinkResults(response.drinks);
  };

  const updateMealState = (newState: Meal[]) => {
    setMealResults(newState);
  };

  const updateDrinkState = (newState: Drink[]) => {
    setDrinkResults(newState);
  };

  useEffect(() => {
    fetchMeals();
    fetchDrinks();
  }, []);

  console.log('Meal Results:', mealResults);
  console.log('Drink Results:', drinkResults);

  return (
    <RecipeContext.Provider
      value={ {
        mealResults,
        setMealResults,
        drinkResults,
        setDrinkResults,
        updateMealState,
        updateDrinkState,
        fetchMeals,
        fetchDrinks,
        favoriteRecipes,
        setFavoriteRecipes,
      } }
    >
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipeContext;
