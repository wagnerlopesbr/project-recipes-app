import { createContext } from 'react';
import { RecipiesContextType } from '../Type/contextType';

const RecipiesContext = createContext({} as RecipiesContextType);

export default RecipiesContext;
