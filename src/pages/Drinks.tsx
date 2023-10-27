import { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import RecipiesContext from '../context/RecipiesContext';

function Drinks() {
  const { recomendation } = useContext(RecipiesContext);
  const { setMealsRecomendation } = recomendation.drinks;
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => {
        if (data.drinks && data.drinks.length > 0) {
          setMealsRecomendation(data.drinks);
        }
      });
  });
  return (
    <div>
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
