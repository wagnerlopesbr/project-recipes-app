import { useState } from 'react';
import { useLocation } from 'react-router-dom';

type IngredientProps = {
  index: number,
  product: string,
  ingredientName: string,
  ingredientKey: string,
};

function IngredientCard({
  index,
  ingredientKey,
  ingredientName,
  product,
}: IngredientProps) {
  const { pathname } = useLocation();

  const [finished, setFinished] = useState<boolean>(false);

  if (pathname.includes('in-progress')) {
    return (
      <>
        <label
          htmlFor={ ingredientName }
          data-testid={ `${index}-ingredient-step` }
          style={ {
            textDecoration: finished ? 'line-through solid rgb(0, 0, 0)' : 'none',
          } }
        >
          <input
            type="checkbox"
            id={ ingredientName }
            checked={ finished }
            onChange={ () => setFinished(!finished) }
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
      { `${ingredientName} - ${ingredientKey}` }
    </li>
  );
}

export default IngredientCard;
