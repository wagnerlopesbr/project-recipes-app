import { DrinkType, MealType } from './type';

export type RecipiesContextType = {
  searchBarData: {
    recipes: DrinkType[] | MealType[];
    setRecipies: (value: React.SetStateAction<never[]>) => void;
  }
  renderRecipes: DrinkType[] | MealType[],
  updateRecipesList: (newList: DrinkType[] | MealType[]) => void,
};
