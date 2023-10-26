import { useState } from 'react';
import { RecipiesContextType } from '../Type/contextType';
import RecipiesContext from './RecipiesContext';

type RecipiesProviderProps = {
  children: React.ReactNode;
};

function RecipiesProvider({ children }: RecipiesProviderProps) {
  const [recipes, setRecipies] = useState([]);

  const value: RecipiesContextType = {
    searchBarData: {
      recipes,
      setRecipies,
    },
  };

  return (
    <RecipiesContext.Provider value={ value }>
      {children}
    </RecipiesContext.Provider>
  );
}

export default RecipiesProvider;
