import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { InProgressRecipesType } from '../../Type/type';

type IngredientProps = {
  index: number;
  product: string;
  ingredientName: string;
  ingredientKey: string;
  toggleIngredient: (name: string) => void;
  recipes: InProgressRecipesType;
};

function IngredientCard({
  index,
  ingredientKey,
  ingredientName,
  product,
  toggleIngredient,
  recipes,
}: IngredientProps) {
  const { id } = useParams();
  const { pathname } = useLocation();
  const key = pathname.includes('meals') ? 'meals' : 'drinks';

  const [finished, setFinished] = useState<boolean>(false);

  const isInProgress = (name: string) => {
    const ingredients = id ? recipes[key][id] : [];
    const ingredient = ingredients.find((item) => item === name);
    return !!ingredient;
  };

  if (pathname.includes('in-progress')) {
    return (
      <>
        <label
          htmlFor={ ingredientName }
          data-testid={ `${index}-ingredient-step` }
          style={ {
            textDecoration: isInProgress(ingredientName)
              ? 'line-through solid rgb(0, 0, 0)' : 'none',
          } }
        >
          <input
            type="checkbox"
            id={ ingredientName }
            checked={ isInProgress(ingredientName) }
            onChange={ () => {
              setFinished(!finished);
              toggleIngredient(ingredientName);
            } }
          />
          {`${ingredientName} - ${ingredientKey}`}

        </label>
        <br />
      </>
    );
  }

  return (
    <li
      data-testid={ `${index}-ingredient-name-and-measure` }
      key={ product }
    >
      {`${ingredientName} - ${ingredientKey}`}
    </li>
  );
}

export default IngredientCard;
