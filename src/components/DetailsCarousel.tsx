import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from '../styles/DetailsCarousel.module.css';
import { DrinkType, MealType } from '../Type/type';

type DetailsCarouselProps = {
  meals: {
    ['meals']: MealType[];
  }
  drinks: {
    ['drinks']: DrinkType[];
  };
};

function DetailsCarousel(
  { drinks, meals }
  : DetailsCarouselProps,
) {
  const route = useLocation();
  const [recipes, setRecipes] = useState<MealType[] | DrinkType[]>([]);

  useEffect(() => {
    if (route.pathname.includes('drinks') && drinks) {
      setRecipes(meals.meals);
    }
    if (route.pathname.includes('meals') && meals) {
      setRecipes(drinks.drinks);
    }
  }, [drinks, meals, route.pathname]);

  return (
    <section>
      <h2>Receitas recomendadas</h2>
      <ul className={ styles.carouselCard }>
        {recipes.slice(0, 6).map((recipe, index) => (
          <li
            key={ recipe.idDrink || recipe.idMeal }
            data-testid={ `${index}-recommendation-card` }
            className={ styles.carouselItem }
          >
            <h3 data-testid={ `${index}-recommendation-title` }>
              {recipe.strDrink || recipe.strMeal}
            </h3>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default DetailsCarousel;
