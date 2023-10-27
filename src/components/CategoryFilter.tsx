import { useEffect, useState } from 'react';
import { fetchAPI } from '../Helpers/FetchAPI';

type CategoryProps = {
  endpoints : {
    initialList: string,
    categories: string,
  };
};

function CategoryFilter({ endpoints }: CategoryProps) {
  const { categories, initialList } = endpoints;

  const [categoriesList, setCategoriesList] = useState<string[]>();
  const [toggle, setToggle] = useState();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await fetchAPI(categories);
      const fiveCategories = Object.values(data)[0].slice(0, 5)
        .map(({ strCategory }) => strCategory);

      setCategoriesList(fiveCategories);
    };
    fetchCategories();
  }, []);

  return (
    <section>
      <button
        data-testid="All-category-filter"
      >
        All
      </button>
      {categoriesList?.map((categoryName) => (
        <button
          value={ categoryName }
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
