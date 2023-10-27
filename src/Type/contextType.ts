import { DrinkType, MealType } from './type';

export type RecipiesContextType = {
<<<<<<< HEAD
  searchBarData: {
    recipes: DrinkType[] | MealType[];
    setRecipies: (value: React.SetStateAction<never[]>) => void;
  }
=======
  renderRecipes: DrinkType[] | MealType[],
>>>>>>> group-8-dev
  updateRecipesList: (newList: DrinkType[] | MealType[]) => void,
  renderRecipes: DrinkType[] | MealType[],
  updateLoading: (parameter: boolean) => void,
  loading: boolean,
};
