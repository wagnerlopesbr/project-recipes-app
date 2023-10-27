import { useState } from 'react';
import { RecipiesContextType } from '../Type/contextType';
import RecipiesContext from './RecipiesContext';
import { DrinkType, MealType } from '../Type/type';
import { set } from 'cypress/types/lodash';

type RecipiesProviderProps = {
  children: React.ReactNode;
};

function RecipiesProvider({ children }: RecipiesProviderProps) {
  const [recipes, setRecipies] = useState([]);
  const [renderRecipes, setRenderRecipes] = useState<DrinkType[] | MealType[]>([]);
  const [drinksRecomendation, setDrinksRecomendation] = useState('');
  const [mealsRecomendation, setMealsRecomendation] = useState('');

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
    recomendation: {
      drinks: {
        mealsRecomendation,
        setMealsRecomendation,
      },
      meals: {
        drinksRecomendation,
        setDrinksRecomendation,
      },
    }
  };

  return (
    <RecipiesContext.Provider value={ value }>
      {children}
    </RecipiesContext.Provider>
  );
}

export default RecipiesProvider;
