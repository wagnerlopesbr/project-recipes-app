import React from "react";
import { IngredientsListType } from "../Type/type";

function IngredientList({ recipesData }: IngredientsListType) {
  /* armazenando as chaves com o Object.keys em um array
    para as mesmas serem filtradas conforme
    incluírem o parâmetro */
  const ingredients = Object.keys(recipesData).filter(
    (product) => product.includes("strIngredient") && recipesData[product]
  );
  
  return (
    <ul>
      {/* fazendo um .map das infos obtidas no array de "ingredients" */}
      {ingredients.map((product, index) => {
        // key armazena o index dinâmico do produto do array
        const key = recipesData[product];
        // ingredientName armazena o "nome" dinâmico do produto/index
        const ingredientName = recipesData[product];
        // incredientKey armazena a info dinâmica do produto/index 
        const ingredientKey = recipesData[key];
        return (
          <li
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ product }
        >
          { `${ingredientName} - ${ingredientKey}` }
        </li>
        )
      })}
    </ul>
  )
};

export default IngredientList;
