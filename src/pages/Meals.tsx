import CategoryFilter from '../components/CategoryFilter';
import Footer from '../components/Footer';

function Meals() {
  return (
    <div>
      <CategoryFilter foodOrBeverage="food" />
      <Footer />
    </div>
  );
}

export default Meals;
