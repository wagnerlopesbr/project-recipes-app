import { DrinkType, MealType } from '../Type/type';

type RecipeCardProps = {
  cardIndex: number,
  recipe: DrinkType | MealType,
};

function RecipeCard({ cardIndex, recipe }: RecipeCardProps) {
  return (
    <div data-testid={ `${cardIndex}-recipe-card` }>
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
        data-testid={ `${cardIndex}-card-img` }
      />
      <p data-testid={ `${cardIndex}-card-name` }>
        {recipe.strMeal || recipe.strDrink}
      </p>
    </div>
  );
}

export default RecipeCard;
