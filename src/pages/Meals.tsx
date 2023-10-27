import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Recipes from "../components/Recipes";
import RecipiesContext from "../context/RecipiesContext";

function Meals() {
  return (
    <div>
      <Recipes />
      <Footer />
    </div>
  );
}

export default Meals;
