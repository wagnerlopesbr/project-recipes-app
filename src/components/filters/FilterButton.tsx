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

  const handleClick = async () => {
    const apiURL = pathname === '/drinks' ? 'thecocktaildb' : 'themealdb';
    if (!toggle) {
      const recipesData = await fetchAPI(`https://www.${apiURL}.com/api/json/v1/1/filter.php?c=${categoryName}`);
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
