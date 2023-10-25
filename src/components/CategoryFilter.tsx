import { useEffect, useState } from 'react';
import { fetchAPI } from '../Helpers/FetchAPI';

const foodEndpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const beverageEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

type CategoryProps = {
  foodOrBeverage: string
};

function CategoryFilter({ foodOrBeverage }: CategoryProps) {
  const [categoriesList, setCategoriesList] = useState<string[]>();

  useEffect(() => {
    const fetchCategories = async () => {
      switch (foodOrBeverage) {
        case 'food': {
          const foodData = await fetchAPI(foodEndpoint);
          const food = foodData.meals.slice(0, 5)
            .map(({ strCategory }) => strCategory);
          setCategoriesList(food);
          break; }

        default: {
          const beverageData = await fetchAPI(beverageEndpoint);
          const beverage = beverageData.drinks.slice(0, 5)
            .map(({ strCategory }) => strCategory);
          setCategoriesList(beverage); }
      }
    };
    fetchCategories();
  }, []);

  console.log(categoriesList);

  return (
    <section>
      {categoriesList?.map((categoryName) => (
        <button
          key={ categoryName }
          data-testid={ `${categoryName}-category-filter` }
        >
          {categoryName}

        </button>
      ))}
    </section>
  );
}

export default CategoryFilter;
