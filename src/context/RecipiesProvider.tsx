import { useState } from 'react';
import { RecipiesContextType } from '../Type/contextType';
import RecipiesContext from './RecipiesContext';
import { DrinkType, MealType } from '../Type/type';

type RecipiesProviderProps = {
  children: React.ReactNode;
};

function RecipiesProvider({ children }: RecipiesProviderProps) {
  const [recipes, setRecipies] = useState([]);
  const [renderRecipes, setRenderRecipes] = useState<DrinkType[] | MealType[]>([]);

  const updateRecipesList = (newList: DrinkType[] | MealType[]) => {
    setRenderRecipes(newList);
  };

  const value: RecipiesContextType = {
    searchBarData: {
      recipes,
      setRecipies,
    },
    updateRecipesList,
    renderRecipes,
  };

  return (
    <RecipiesContext.Provider value={ value }>
      {children}
    </RecipiesContext.Provider>
  );
}

export default RecipiesProvider;
