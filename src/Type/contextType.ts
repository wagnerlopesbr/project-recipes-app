import { DrinkType, MealType } from './type';

export type RecipiesContextType = {
  searchBarData: {
    recipes: DrinkType[] | MealType[];
    setRecipies: (value: React.SetStateAction<never[]>) => void;
  }
  updateRecipesList: (newList: DrinkType[] | MealType[]) => void,
  renderRecipes: DrinkType[] | MealType[],
  updateLoading: (parameter: boolean) => void,
  loading: boolean,
};
