import { useContext, useEffect, useState } from 'react';
import { fetchAPI } from '../../Helpers/FetchAPI';
import FilterButton from './FilterButton';
import RecipiesContext from '../../context/RecipiesContext';
import { DrinkType, MealType } from '../../Type/type';

type CategoryProps = {
  endpoints : {
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
        Object.values(data)[0] as string[]
      ).slice(0, 5)
        .map(({ strCategory }) => strCategory);

      setCategoriesList(fiveCategories);
    };
    fetchCategories();
  }, []);

  const handleClick = async () => {
    const recipesData = await fetchAPI(initialList);
    updateRecipesList(Object.values(recipesData)[0] as DrinkType[] | MealType[]);
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
