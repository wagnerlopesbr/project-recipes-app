import { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import RecipiesContext from '../context/RecipiesContext';
import { useLocation } from 'react-router-dom';
import { d } from 'vitest/dist/types-e3c9754d';

function Drinks() {
  return (
    <div>
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
