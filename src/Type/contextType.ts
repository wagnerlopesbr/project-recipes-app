import { DrinkType, MealType } from './type';

export type RecipiesContextType = {
  searchBarData: {
    recipes: DrinkType[] | MealType[];
    setRecipies: (value: React.SetStateAction<never[]>) => void;
  }
  renderRecipes: DrinkType[] | MealType[],
  updateRecipesList: (newList: DrinkType[] | MealType[]) => void,
  recomendation: {
    drinks: {
      mealsRecomendation: string,
      setMealsRecomendation: React.Dispatch<React.SetStateAction<string>>;
    },
    meals: {
      drinksRecomendation: string,
      setDrinksRecomendation: React.Dispatch<React.SetStateAction<string>>;
    }

  }
};
