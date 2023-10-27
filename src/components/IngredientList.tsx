import React from 'react';
import { IngredientsListType } from '../Type/type';
import IngredientCard from './ingredients/IngredientCard';

function IngredientList({ recipesData }: IngredientsListType) {
  /* armazenando as chaves com o Object.keys em um array
    para as mesmas serem filtradas conforme incluírem o parâmetro */
  const ingredients = Object.keys(recipesData).filter(
    (product) => product.includes('strIngredient') && recipesData[product],
  );

  const measurement = Object.keys(recipesData).filter(
    (measure) => measure.includes('strMeasure') && recipesData[measure],
  );

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
          />
        );
      })}
    </ul>
  );
}

export default IngredientList;
