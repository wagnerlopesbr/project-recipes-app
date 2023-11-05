import { useContext, useEffect, useState } from 'react';
import { fetchAPI } from '../../Helpers/FetchAPI';
import FilterButton from './FilterButton';
import RecipiesContext from '../../context/RecipiesContext';
import { CategoryType, DrinkType, MealType } from '../../Type/type';
import { addToCache, getFromCache } from '../../hooks/useFetch';

type CategoryProps = {
  endpoints: {
    initialList: string,
    categories: string,
  };
};

function CategoryFilter({ endpoints }: CategoryProps) {
  const { categories, initialList } = endpoints;
  const { updateRecipesList } = useContext(RecipiesContext);

  const [categoriesList, setCategoriesList] = useState<string[]>();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await fetchAPI(categories);
      const fiveCategories = (
        Object.values(data)[0] as CategoryType[]
      ).slice(0, 5)
        .map(({ strCategory }) => strCategory);

      setCategoriesList(fiveCategories);
    };
    fetchCategories();
  }, []);

  const handleClick = async () => {
    const cachedData = getFromCache<DrinkType[] | MealType[]>(initialList);
    if (cachedData) {
      updateRecipesList(cachedData);
      return;
    }

    const recipesData = await fetchAPI(initialList);
    const recipes = Object.values(recipesData)[0] as DrinkType[] | MealType[];
    updateRecipesList(recipes);
    addToCache(initialList, recipes);
  };

  return (
    <section>
      <button
        data-testid="All-category-filter"
        onClick={ handleClick }
      >
        All
      </button>
      {categoriesList?.map((categoryName) => (
        <FilterButton key={ categoryName } buttonInfo={ { categoryName, initialList } } />
      ))}
    </section>
  );
}

export default CategoryFilter;
