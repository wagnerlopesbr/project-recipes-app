import { useCallback, useState } from 'react';
import { RecipiesContextType } from '../Type/contextType';
import RecipiesContext from './RecipiesContext';
import { DrinkType, InProgressRecipesType, Key, MealType } from '../Type/type';
import useLocalStorage from '../hooks/useLocalStorage';
import { initInProgress } from '../Helpers/helpers';

type RecipiesProviderProps = {
  children: React.ReactNode;
};

function RecipiesProvider({ children }: RecipiesProviderProps) {
  const [renderRecipes, setRenderRecipes] = useState<DrinkType[] | MealType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [recipes, setRecipes] = useLocalStorage<InProgressRecipesType>(
    'inProgressRecipes',
    initInProgress,
  );

  const toggleItem = (name: string, key: Key, id: string | undefined) => {
    const storageIngredients = id ? recipes[key][id] : [];
    if (!id) return;
    const ingredient = storageIngredients.find((item) => item === name);
    if (ingredient) {
      const newIngredients = storageIngredients.filter((item) => item !== name);
      setRecipes({ ...recipes, [key]: { [id]: newIngredients } });
    } else {
      setRecipes({ ...recipes, [key]: { [id]: [...storageIngredients, name] } });
    }
  };

  const initInProgressStorage = (key: Key, id: string | undefined) => {
    if (!recipes[key]) return;
    const storageIngredients = id ? recipes[key][id] : [];
    if (!storageIngredients && id) {
      setRecipes({ ...recipes, [key]: { [id]: [] } });
    }
  };

  const updateRecipesList = useCallback((newList: DrinkType[] | MealType[]) => {
    setRenderRecipes(newList);
  }, []);

  const updateLoading = (parameter: boolean) => setLoading(parameter);

  const value: RecipiesContextType = {
    updateRecipesList,
    renderRecipes,
    updateLoading,
    loading,
    recipes,
    toggleItem,
    initInProgressStorage,
  };

  return (
    <RecipiesContext.Provider value={ value }>
      {children}
    </RecipiesContext.Provider>
  );
}

export default RecipiesProvider;
