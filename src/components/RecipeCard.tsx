import { DrinkType, MealType } from '../Type/type';

type RecipieProps = {
  recipes: DrinkType[] | MealType[];
};

function RecipeCard({ recipes }: RecipieProps) {
  return (
    <div>
      {recipes.slice(0, 12).map((recipe: DrinkType | MealType, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt={ recipe.strMeal || recipe.strDrink }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>
            {recipe.strMeal || recipe.strDrink}
          </p>
        </div>
      ))}
    </div>
  );
}

export default RecipeCard;
