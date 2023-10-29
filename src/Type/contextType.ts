import { DrinkType, InProgressRecipesType, Key, MealType } from './type';

export type RecipiesContextType = {
  renderRecipes: DrinkType[] | MealType[],
  updateRecipesList: (newList: DrinkType[] | MealType[]) => void,
  updateLoading: (parameter: boolean) => void,
  loading: boolean,
  recipes: InProgressRecipesType,
  toggleItem: (name: string, key: Key, id: string | undefined) => void;
  initInProgressStorage: (key: Key, id: string | undefined) => void;
};
