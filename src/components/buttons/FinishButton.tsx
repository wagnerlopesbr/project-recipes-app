import { useNavigate } from 'react-router-dom';

type Props = {
  ingredients: string[];
  storedIngredients: string[];
  setToDoneRecipes: () => void;
};

function FinishButton({ ingredients, storedIngredients, setToDoneRecipes }: Props) {
  const nav = useNavigate();
  const finished = ingredients.length > 0 && ingredients
    .every((ingredient) => storedIngredients.includes(ingredient));

  return (
    <button
      data-testid="finish-recipe-btn"
      disabled={ !finished }
      onClick={ () => {
        setToDoneRecipes();
        nav('/done-recipes');
      } }
    >
      Finish Recipe
    </button>
  );
}

export default FinishButton;
