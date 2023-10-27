import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchAPI } from '../../Helpers/FetchAPI';
import RecipiesContext from '../../context/RecipiesContext';

type ButtonProps = {
  buttonInfo: {
    categoryName: string,
    initialList: string,
  }
};

function FilterButton({ buttonInfo: { categoryName, initialList } }: ButtonProps) {
  const { updateRecipesList } = useContext(RecipiesContext);

  const [toggle, setToggle] = useState<boolean>(false);

  const { pathname } = useLocation();

  const searchEndpoint = () => {
    switch (pathname) {
      case '/drinks': {
        return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryName}`;
      }
      default: {
        return `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;
      }
    }
  };

  const handleClick = async () => {
    if (!toggle) {
      const recipesData = await fetchAPI(searchEndpoint());
      updateRecipesList(Object.values(recipesData)[0]);
    } else {
      const recipesData = await fetchAPI(initialList);
      updateRecipesList(Object.values(recipesData)[0]);
    }
    setToggle(!toggle);
  };

  return (
    <button
      onClick={ handleClick }
      key={ categoryName }
      data-testid={ `${categoryName}-category-filter` }
    >
      {categoryName}

    </button>
  );
}

export default FilterButton;
