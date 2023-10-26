import { useState } from 'react';
import { RecipiesContextType } from '../Type/contextType';
import RecipiesContext from './RecipiesContext';
import { DrinkType, MealType } from '../Type/type';

type RecipiesProviderProps = {
  children: React.ReactNode;
};

function RecipiesProvider({ children }: RecipiesProviderProps) {
  const [renderRecipes, setRenderRecipes] = useState<object[]>([]);

  const value: RecipiesContextType = {
    renderRecipes,
    setRenderRecipes,
  };

  return (
    <RecipiesContext.Provider value={ value }>
      {children}
    </RecipiesContext.Provider>
  );
}

export default RecipiesProvider;
