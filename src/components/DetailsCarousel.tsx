import { useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

import { DRINKS_LINK, MEALS_LINK } from '../Helpers/Links';
import { ApiReturn } from '../Type/type';
import styles from '../styles/DetailsCarousel.module.css';

function DetailsCarousel() {
  const { pathname } = useLocation();
  const url = pathname.includes('drinks') ? MEALS_LINK : DRINKS_LINK;
  const key = pathname.includes('drinks') ? 'meals' : 'drinks';

  const { data } = useFetch<ApiReturn>(url);
  const recipes = data ? data[key] : [];

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
