import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { InProgressRecipesType, IngredientsListType } from '../../Type/type';
import IngredientCard from './IngredientCard';
import useLocalStorage from '../../hooks/useLocalStorage';
import { initInProgress } from '../../Helpers/helpers';

function IngredientList({ recipesData }: IngredientsListType) {
  const { id } = useParams();
  const { pathname } = useLocation();
  const key = pathname.includes('meals') ? 'meals' : 'drinks';
  /* armazenando as chaves com o Object.keys em um array
    para as mesmas serem filtradas conforme incluírem o parâmetro */
  const ingredients = Object.keys(recipesData).filter(
    (product) => product.includes('strIngredient') && recipesData[product],
  );

  const measurement = Object.keys(recipesData).filter(
    (measure) => measure.includes('strMeasure') && recipesData[measure],
  );

  const [recipes, setRecipes] = useLocalStorage<InProgressRecipesType>(
    'inProgressRecipes',
    initInProgress,
  );

  useEffect(() => {
    const storageIngredients = id ? recipes[key][id] : [];
    if (!storageIngredients && id) {
      setRecipes({ ...recipes, [key]: { [id]: [] } });
    }
  }, [id, key, recipes, setRecipes]);

  const toggleItem = (name: string) => {
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

  return (
    <ul>
      {/* fazendo um .map das infos obtidas no array de "ingredients" */}
      {ingredients.map((product, index) => {
        // ingredientName armazena o "nome" dinâmico do produto/index
        const ingredientName = recipesData[product];
        // incredientKey armazena a info dinâmica do produto/index
        const ingredientKey = recipesData[measurement[index]];
        return (
          <IngredientCard
            key={ ingredientName }
            index={ index }
            product={ product }
            ingredientName={ ingredientName }
            ingredientKey={ ingredientKey }
            toggleIngredient={ toggleItem }
            recipes={ recipes }
          />
        );
      })}
    </ul>
  );
}

export default IngredientList;
