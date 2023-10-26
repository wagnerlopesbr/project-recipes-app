import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Meals() {
  return (
    <div>
      <Recipes foodOrDrinks="food" />
      <Footer />
    </div>
  );
}

export default Meals;
