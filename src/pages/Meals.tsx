import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Recipes from "../components/Recipes";
import RecipiesContext from "../context/RecipiesContext";

function Meals() {
  const { recomendation } = useContext(RecipiesContext);
  const { setDrinksRecomendation } = recomendation.meals;
  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => {
        if (data.drinks && data.drinks.length > 0) {
          setDrinksRecomendation(data.drinks);
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

export default Meals;
